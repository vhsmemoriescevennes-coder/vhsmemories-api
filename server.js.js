const http = require('http');
const PORT = 3001;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>VhsMemories</title>
<style>
body { background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; font-family: Arial; padding: 40px; margin: 0; }
.container { max-width: 1200px; margin: 0 auto; }
h1 { text-align: center; color: #667eea; }
.card { background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; margin: 20px 0; }
.client { background: rgba(255,255,255,0.05); padding: 20px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #667eea; }
</style>
</head>
<body>
<div class="container">
<h1>🎬 VhsMemories - SUCCESS!</h1>
<div class="card">
<h2>✅ Server is RUNNING!</h2>
<p>No npm needed! Just Node.js!</p>
</div>
<div class="card">
<h2>👥 Clients</h2>
<div id="clients"></div>
</div>
</div>
<script>
fetch('/api/clients').then(r=>r.json()).then(d=>{
  document.getElementById('clients').innerHTML = d.map(c=>'<div class="client"><strong>'+c.name+'</strong> - '+c.quantity+' '+c.type+'</div>').join('');
}).catch(e=>console.log('API loaded'));
</script>
</body>
</html>`;

let clients = [
  { id: 1, name: 'Dumas Benjamin', type: 'VHS', quantity: 15 },
  { id: 2, name: 'Luc Bruno', type: 'Diapositives', quantity: 1 }
];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  if (req.url === '/' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(200);
    res.end(html);
  } else if (req.url === '/api/clients' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(clients));
  } else if (req.url === '/api/clients' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      clients.push(JSON.parse(body));
      res.writeHead(200);
      res.end(JSON.stringify({ok: true}));
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════╗');
  console.log('║  🔥 VhsMemories is RUNNING!       ║');
  console.log('║  🌐 http://localhost:3001         ║');
  console.log('║  ⛔ Ctrl+C to stop                ║');
  console.log('╚════════════════════════════════════╝');
  console.log('');
});
