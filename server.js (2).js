const http = require('http');

let clients = [
  { id: 1, name: 'Dumas Benjamin', type: 'VHS', quantity: 15, montant: 225, status: 'En cours' },
  { id: 2, name: 'Luc Bruno', type: 'Diapositives', quantity: 1, montant: 0, status: 'En attente' }
];

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
<h1>🎬 VhsMemories - ONLINE!</h1>
<div class="card">
<h2>✅ Server is LIVE on Vercel!</h2>
<p>No npm, no cmd needed! Just access from anywhere!</p>
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

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.url === '/' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).end(html);
  } else if (req.url === '/api/clients' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).end(JSON.stringify(clients));
  } else if (req.url === '/api/clients' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const newClient = JSON.parse(body);
        newClient.id = Math.max(...clients.map(c => c.id), 0) + 1;
        clients.push(newClient);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).end(JSON.stringify(newClient));
      } catch (e) {
        res.status(400).end('Invalid JSON');
      }
    });
  } else {
    res.status(404).end('Not found');
  }
};
