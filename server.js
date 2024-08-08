import { createApp } from 'nuxt';
import { listen } from 'vercel-serverless-api';

const app = await createApp();
listen(app);
