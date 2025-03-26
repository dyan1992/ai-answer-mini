import { Hono } from 'hono';

const downloadRoutes = new Hono();

// Helper function to create a simple text file for project structure
async function createSimpleProjectFile(): Promise<Uint8Array> {
  const files = [
    "index.ts",
    "middleware/error_handler.ts",
    "middleware/logger.ts",
    "routes/download.ts",
    "routes/echo.ts",
    "routes/home.ts",
    "routes/static_download.ts"
  ];
  
  const fileContents = files.map(file => {
    return `// ${file}\n// This is a placeholder for ${file}\n`;
  }).join("\n\n");
  
  const encoder = new TextEncoder();
  const projectInfo = `
    Project Structure
    ================
    
    Files:
    ${files.join('\n    ')}
    
    ${fileContents}
  `;
  
  return encoder.encode(projectInfo);
}

// Download endpoint
downloadRoutes.get('/project', async (c) => {
  try {
    // Create a simple representation of the project
    const fileContent = await createSimpleProjectFile();
    
    // Set headers for file download
    c.header('Content-Type', 'text/plain');
    c.header('Content-Disposition', 'attachment; filename="project_structure.txt"');
    c.header('Content-Length', fileContent.length.toString());
    
    return c.body(fileContent);
  } catch (error) {
    console.error('Download error:', error);
    return c.json({
      error: 'Failed to generate download',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// File download endpoint (simplified for Cloudflare Workers environment)
downloadRoutes.get('/file', async (c) => {
  try {
    const filePath = c.req.query('path');
    
    if (!filePath) {
      return c.json({
        error: 'Missing file path parameter'
      }, 400);
    }
    
    // Create a simple text representation of the file
    const content = `// This is a simplified representation of: ${filePath}
// Actual file content cannot be accessed in this environment.
// This is a demo placeholder.`;

    const encoder = new TextEncoder();
    const fileContent = encoder.encode(content);
    
    // Set headers for file download
    c.header('Content-Type', 'text/plain');
    c.header('Content-Disposition', `attachment; filename="${filePath.split('/').pop() || 'file.txt'}"`);
    c.header('Content-Length', fileContent.length.toString());
    
    return c.body(fileContent);
  } catch (error) {
    console.error('File download error:', error);
    return c.json({
      error: 'Failed to download file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Folder download endpoint
downloadRoutes.get('/folder', async (c) => {
  try {
    const folderPath = c.req.query('path');
    
    if (!folderPath) {
      return c.json({
        error: 'Missing folder path parameter'
      }, 400);
    }
    
    // Create a simple text representation of the folder structure
    const content = `# Folder: ${folderPath}

This is a simplified representation of the folder structure.
In a Cloudflare Workers environment, direct folder access is not available.

## Example files that might be in this folder:
- ${folderPath}/file1.ts
- ${folderPath}/file2.ts
- ${folderPath}/subfolder/file3.ts
`;

    const encoder = new TextEncoder();
    const fileContent = encoder.encode(content);
    
    // Set headers for file download
    c.header('Content-Type', 'text/plain');
    c.header('Content-Disposition', `attachment; filename="${folderPath}.txt"`);
    c.header('Content-Length', fileContent.length.toString());
    
    return c.body(fileContent);
  } catch (error) {
    console.error('Folder download error:', error);
    return c.json({
      error: 'Failed to download folder',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

export default downloadRoutes;
