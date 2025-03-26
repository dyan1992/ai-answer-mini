import { Hono } from 'hono';
import { html } from 'hono/html';

const homeRoutes = new Hono();

homeRoutes.get('/', (c) => {
  const htmlContent = html`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>项目下载中心</title>
  <style>
    /* 基础样式 */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f7;
      padding: 20px;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    /* 头部样式 */
    header {
      background: linear-gradient(135deg, #4f6df5, #3a5bbf);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }

    header h1 {
      margin-bottom: 10px;
      font-size: 2rem;
    }

    /* 导航样式 */
    nav {
      background-color: #2c3e50;
      padding: 0 10px;
    }

    nav ul {
      list-style: none;
      display: flex;
      justify-content: center;
    }

    nav ul li {
      margin: 0;
    }

    nav ul li a {
      color: white;
      text-decoration: none;
      padding: 15px 20px;
      display: block;
      transition: background-color 0.3s;
      font-weight: 500;
    }

    nav ul li a:hover {
      background-color: #34495e;
    }

    nav ul li a.active {
      background-color: #3a5bbf;
      position: relative;
    }

    nav ul li a.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #fff;
    }

    /* 主内容区样式 */
    main {
      padding: 20px;
    }

    .content-section {
      display: none;
    }

    .content-section.active {
      display: block;
    }

    h2 {
      color: #2c3e50;
      margin: 20px 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }

    /* 卡片样式 */
    .card {
      background: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    /* 端点样式 */
    .endpoint {
      margin: 15px 0;
      position: relative;
    }

    .method {
      background: #4CAF50;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8em;
      font-weight: bold;
      display: inline-block;
      margin-bottom: 10px;
    }

    .endpoint-url {
      font-weight: bold;
      margin-bottom: 5px;
      font-size: 1.1em;
      color: #2c3e50;
    }

    code {
      background: #f1f1f1;
      padding: 2px 4px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.9em;
    }

    button {
      background: #4CAF50;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      margin-top: 10px;
      transition: background-color 0.3s;
    }

    button:hover {
      background: #3e8e41;
    }

    /* 下载中心样式 */
    .download-section {
      background: white;
      border-radius: 10px;
      padding: 25px;
      margin: 20px 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.08);
      border: 1px solid #eee;
    }

    .file-list {
      list-style: none;
      padding: 0;
    }

    .file-item {
      padding: 12px 15px;
      border: 1px solid #eee;
      margin-bottom: 10px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.3s;
    }

    .file-item:hover {
      background-color: #f5f5f5;
    }

    .download-btn {
      background: #4CAF50;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.3s;
    }

    .download-btn:hover {
      background: #3e8e41;
    }

    /* API文档样式 */
    .api-endpoint {
      margin-bottom: 30px;
    }

    .api-endpoint h3 {
      margin-bottom: 15px;
      color: #3a5bbf;
    }

    .code-example {
      background-color: #2c3e50;
      color: #fff;
      border-radius: 8px;
      padding: 15px;
      margin: 15px 0;
      overflow-x: auto;
    }

    .code-example pre {
      margin: 0;
    }

    .code-example code {
      font-family: Consolas, Monaco, 'Andale Mono', monospace;
      background: transparent;
      color: #fff;
      padding: 0;
    }

    .form-group {
      margin-bottom: 15px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
    }

    .form-group label {
      font-weight: 500;
      min-width: 100px;
    }

    .form-group input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      flex: 1;
    }

    .response-container {
      margin-top: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
    }

    .response-container pre {
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      margin-top: 10px;
    }

    /* 底部样式 */
    footer {
      text-align: center;
      padding: 20px;
      background-color: #2c3e50;
      color: #fff;
      font-size: 0.9em;
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
      nav ul {
        flex-direction: column;
      }
      
      nav ul li a {
        text-align: center;
      }
      
      .file-item {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .file-item button {
        margin-top: 10px;
        width: 100%;
      }
      
      .form-group {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .form-group label,
      .form-group input {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>项目下载中心</h1>
      <p>这是一个简单的项目浏览和下载页面</p>
    </header>

    <nav>
      <ul>
        <li><a href="#" class="active" data-section="home">首页</a></li>
        <li><a href="#" data-section="downloads">下载中心</a></li>
        <li><a href="#" data-section="api">API文档</a></li>
      </ul>
    </nav>

    <main>
      <!-- 首页内容 -->
      <section id="home" class="content-section active">
        <div class="card">
          <h2>项目状态: 在线</h2>
          <p>项目服务正常运行中。</p>
          <p>当前版本: 1.0.0</p>
        </div>

        <h2>可用功能</h2>
        
        <div class="card endpoint">
          <span class="method">API</span>
          <p class="endpoint-url">/api/echo</p>
          <p>返回提供的查询参数作为JSON响应。</p>
          <p>示例: <code>?name=value&another=parameter</code></p>
          <button onclick="testEcho()">测试API</button>
        </div>

        <div class="card endpoint">
          <span class="method">下载</span>
          <p class="endpoint-url">项目结构</p>
          <p>下载项目结构概览。</p>
          <button onclick="downloadStructure()">下载项目结构</button>
        </div>
      </section>

      <!-- 下载中心内容 -->
      <section id="downloads" class="content-section">
        <div class="download-section">
          <h2>项目结构</h2>
          <p>下载包含项目结构概览的文本文件：</p>
          <button onclick="downloadStructure()" class="download-btn">下载结构</button>
        </div>
        
        <div class="download-section">
          <h2>主要文件</h2>
          <ul class="file-list">
            <li class="file-item">
              <span>index.ts</span>
              <button class="download-btn" onclick="downloadFile('index.ts')">下载</button>
            </li>
            <li class="file-item">
              <span>路由文件夹</span>
              <button class="download-btn" onclick="downloadFolder('routes')">下载</button>
            </li>
            <li class="file-item">
              <span>中间件文件夹</span>
              <button class="download-btn" onclick="downloadFolder('middleware')">下载</button>
            </li>
          </ul>
        </div>
      </section>

      <!-- API文档内容 -->
      <section id="api" class="content-section">
        <div class="card">
          <h2>API端点文档</h2>
          
          <div class="api-endpoint">
            <h3>Echo API</h3>
            <p><strong>URL:</strong> <code>/api/echo</code></p>
            <p><strong>方法:</strong> GET</p>
            <p><strong>描述:</strong> 返回所有提供的查询参数作为JSON响应。</p>
            <p><strong>参数:</strong> 任意查询参数</p>
            <p><strong>示例:</strong></p>
            <div class="code-example">
              <pre><code>URL: /api/echo?name=张三&age=25&city=北京
              
响应:
{
  "success": true,
  "echo": {
    "name": "张三",
    "age": "25",
    "city": "北京"
  },
  "timestamp": "2023-07-21T12:34:56.789Z"
}
              </code></pre>
            </div>
            <div class="test-api">
              <h4>测试API</h4>
              <form id="echo-form">
                <div class="form-group">
                  <label for="param1-name">参数名称</label>
                  <input type="text" id="param1-name" value="name">
                  <label for="param1-value">参数值</label>
                  <input type="text" id="param1-value" value="张三">
                </div>
                <div class="form-group">
                  <label for="param2-name">参数名称</label>
                  <input type="text" id="param2-name" value="age">
                  <label for="param2-value">参数值</label>
                  <input type="text" id="param2-value" value="25">
                </div>
                <button type="button" onclick="testEchoWithParams()">发送请求</button>
              </form>
              <div class="response-container">
                <h4>API响应</h4>
                <pre id="echo-response"><code>// 响应将显示在这里</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p>&copy; 2023 项目下载中心. 保留所有权利.</p>
    </footer>
  </div>

  <script>
    // 导航切换功能
    document.addEventListener('DOMContentLoaded', () => {
      const navLinks = document.querySelectorAll('nav a');
      
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // 移除所有导航项的活动状态
          navLinks.forEach(item => item.classList.remove('active'));
          
          // 为当前点击的导航项添加活动状态
          this.classList.add('active');
          
          // 获取目标部分
          const targetSection = this.getAttribute('data-section');
          
          // 隐藏所有内容部分
          document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
          });
          
          // 显示目标内容部分
          document.getElementById(targetSection).classList.add('active');
        });
      });
    });
    
    // 测试Echo API
    function testEcho() {
      const params = new URLSearchParams({
        name: '测试用户',
        action: '查询',
        timestamp: new Date().toISOString()
      });
      
      fetch(`/api/echo?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
          document.getElementById('echo-response').textContent = JSON.stringify(data, null, 2);
          
          // 切换到API选项卡
          document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
          document.querySelector('nav a[data-section="api"]').classList.add('active');
          document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
          document.getElementById('api').classList.add('active');
        })
        .catch(error => {
          document.getElementById('echo-response').textContent = `错误: ${error.message}`;
        });
    }
    
    // 使用表单参数测试Echo API
    function testEchoWithParams() {
      const params = new URLSearchParams();
      
      // 获取表单值
      const param1Name = document.getElementById('param1-name').value;
      const param1Value = document.getElementById('param1-value').value;
      const param2Name = document.getElementById('param2-name').value;
      const param2Value = document.getElementById('param2-value').value;
      
      if (param1Name) params.append(param1Name, param1Value || '');
      if (param2Name) params.append(param2Name, param2Value || '');
      
      fetch(`/api/echo?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
          document.getElementById('echo-response').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
          document.getElementById('echo-response').textContent = `错误: ${error.message}`;
        });
    }
    
    // 下载项目结构
    function downloadStructure() {
      window.location.href = '/download/project';
    }
    
    // 下载单个文件
    function downloadFile(filename) {
      window.location.href = '/download/file?path=' + encodeURIComponent(filename);
    }
    
    // 下载文件夹
    function downloadFolder(foldername) {
      window.location.href = '/download/folder?path=' + encodeURIComponent(foldername);
    }
  </script>
</body>
</html>`;
  
  return c.html(htmlContent);
});

export default homeRoutes;
