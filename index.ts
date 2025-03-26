import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/error_handler';
import echoRoutes from './routes/echo';
import homeRoutes from './routes/home';
import downloadRoutes from './routes/download';
import staticDownloadRoutes from './routes/static_download';

// Define environment variable types
type Bindings = {
  SUPABASE_URL: string;
  JWT_SECRET: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

// Create a typed Hono instance
const app = new Hono<{ Bindings: Bindings }>();

// Global middleware
app.use('*', logger);
app.use('*', errorHandler);

// Routes
app.route('/api', echoRoutes);
app.route('/download', downloadRoutes);
app.route('/downloads', staticDownloadRoutes);

// Home route - serves the HTML home page
app.get('/', (c) => {
  return homeRoutes.fetch(c.req, c.env);
});

// Not found handler
app.notFound((c) => {
  return c.json({
    code: 404,
    message: 'Not Found',
    details: 'The requested resource does not exist'
  }, 404);
});

// Export with the correct Cloudflare Workers format
export default {
  fetch: app.fetch
};
