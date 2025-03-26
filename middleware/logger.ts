import { Context } from 'hono';

export const logger = async (c: Context, next: () => Promise<void>) => {
  const start = Date.now();
  const requestId = crypto.randomUUID();
  
  c.header('X-Request-ID', requestId);
  
  console.log(`[${new Date().toISOString()}] [${requestId}] [${c.req.method}] ${c.req.url}`);
  
  await next();
  
  const end = Date.now();
  const time = end - start;
  
  console.log(`[${new Date().toISOString()}] [${requestId}] [${c.req.method}] ${c.req.url} - Completed in ${time}ms`);
};
