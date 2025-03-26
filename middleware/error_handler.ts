import { Context } from 'hono';

export const errorHandler = async (c: Context, next: () => Promise<void>) => {
  try {
    await next();
  } catch (error) {
    console.error('Unhandled error:', error);
    
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const errorId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    
    return c.json({
      code: 500,
      message: 'Internal Server Error',
      details: message,
      errorId,
      timestamp: new Date().toISOString()
    }, 500);
  }
};
