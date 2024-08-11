import { google } from 'googleapis';
import { Readable } from 'stream';
import { googleCredentials } from '~/data/googleCredentials';

const validateGoogleCredentials = (credentials: Record<string, string>): void => {
  const requiredFields = [
    'type',
    'project_id',
    'private_key_id',
    'private_key',
    'client_email',
    'client_id',
    'auth_uri',
    'token_uri',
    'auth_provider_x509_cert_url',
    'client_x509_cert_url',
  ];

  const missingFields = requiredFields.filter((field) => !credentials[field]);

  if (missingFields.length > 0) {
    console.error('Missing required fields in Google credentials:', missingFields);
    throw new Error(
      `Google credentials are missing required fields: ${missingFields.join(', ')}. Please ensure all necessary credentials are configured correctly.`,
    );
  }
};

export const useGoogleAPI = () => {
  // @ts-expect-error: useRuntimeConfig is not typed but it is valid
  const config = useRuntimeConfig();

  // load the credentials from the file
  // const file = config.public.googleApplicationCredentials;
  // const keyFilePath = path.resolve(process.cwd(), file);
  // console.log('keyFilePath :>> ', keyFilePath);
  // const auth = new google.auth.GoogleAuth({
  //   keyFile: keyFilePath,
  //   scopes: config.public.googleScopes.split(','),
  // });

  let auth;
  // Get the credentials
  const credentials = googleCredentials(config).credentials;

  // Validate the credentials
  validateGoogleCredentials(credentials);
  try {
    auth = new google.auth.GoogleAuth(googleCredentials(config));
    // console.log('Google Auth initialized successfully: ', auth);
    console.log('Google Auth initialized successfully!');
  } catch (error) {
    console.error('Failed to initialize Google Auth:', error);
    throw new Error(
      'Google credentials are not properly configured or there was an error initializing Google Auth.',
    );
  }

  const drive = google.drive({ version: 'v3', auth });

  const bufferToStream = (buffer: Buffer) => {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  };

  const getFileStream = async (fileId: string, mimeType: string) => {
    try {
      const res = await drive.files.export(
        { fileId: fileId, mimeType: mimeType },
        { responseType: 'stream' },
      );
      return res.data as Readable;
    } catch (error) {
      console.error('Error getting file stream from Google Drive:', error);
      throw error;
    }
  };

  const getDriveFolderLink = (folderId: string): string => {
    return `https://drive.google.com/drive/folders/${folderId}`;
  };

  const getFolderId = async (folderName: string, parentId: string) => {
    const res = await drive.files.list({
      q: `'${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
      fields: 'files(id, name)',
    });
    if (res.data.files && res.data.files.length > 0) {
      return res.data.files[0].id as string;
    } else {
      const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId],
      };
      const folder = await drive.files.create({
        requestBody: folderMetadata,
        fields: 'id',
      });
      return folder.data.id as string;
    }
  };

  const uploadFile = async (folderName: string, fileName: string, fileContent: Buffer) => {
    try {
      console.log('going to upload a file');

      // Ensure the folder exists
      const parentFolderId = config.public.googleDriveFolderId; // parent folder ID
      const folderId = await getFolderId(folderName, parentFolderId);

      const response = await drive.files.create({
        requestBody: {
          name: fileName,
          parents: [folderId],
          mimeType: 'application/vnd.google-apps.spreadsheet',
        },
        media: {
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx file MIME type
          body: bufferToStream(fileContent),
        },
        fields: 'id',
      });

      // console.log('response :>> ', response);

      const fileId = response.data.id!;

      await drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      return { fileId, folderId };
    } catch (error) {
      console.error('Error uploading file to Google Drive:', error);
      throw error;
    }
  };

  return { uploadFile, getFileStream, getDriveFolderLink };
};
