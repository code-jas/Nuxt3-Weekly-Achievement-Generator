import { google } from 'googleapis';
import { Readable } from 'stream';
import path from 'path';

export const useGoogleAPI = () => {
  // @ts-ignore
  const config = useRuntimeConfig();

  const file = config.public.googleApplicationCredentials;
  const keyFilePath = path.resolve(process.cwd(), file);
  console.log('keyFilePath :>> ', keyFilePath);

  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: config.public.googleScopes.split(','),
  });

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
      const parentFolderId = '1PEygCw9qYroAXyT5HgbamJ9pbRyjDysT'; // Replace with your actual parent folder ID
      const folderId = await getFolderId(folderName, parentFolderId);

      const response = await drive.files.create({
        requestBody: {
          name: fileName,
          parents: [folderId], // Use the determined folder ID
          mimeType: 'application/vnd.google-apps.spreadsheet', // Create a Google Sheet
        },
        media: {
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX file MIME type
          body: bufferToStream(fileContent),
        },
        fields: 'id',
      });

      console.log('response :>> ', response);

      const fileId = response.data.id!;

      await drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      return fileId;
    } catch (error) {
      console.error('Error uploading file to Google Drive:', error);
      throw error;
    }
  };

  return { uploadFile, getFileStream };
};
