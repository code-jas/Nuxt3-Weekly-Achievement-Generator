import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

let storage: FirebaseStorage | null = null;

export const useFirebase = () => {
  if (!storage) {
    // @ts-expect-error: useRuntimeConfig is not typed but it is valid
    const config = useRuntimeConfig();

    const firebaseConfig = {
      apiKey: config.public.fbApiKey,
      authDomain: config.public.fbAuthDomain,
      projectId: config.public.fbProjectId,
      storageBucket: config.public.fbStorageBucket,
      messagingSenderId: config.public.fbMessagingSenderId,
      appId: config.public.fbAppId,
      measurementId: config.public.fbMeasurementId,
    };

    let app;
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }

    storage = getStorage(app);
  }

  return { storage };
};
