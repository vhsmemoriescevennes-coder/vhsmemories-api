let clients = [
  { id: 1, name: 'Dumas Benjamin', type: 'VHS', quantity: 15, montant: 225, status: 'En cours' },
  { id: 2, name: 'Luc Bruno', type: 'Diapositives', quantity: 1, montant: 0, status: 'En attente' }
];

const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>VhsMemories</title><style>body{background:linear-gradient(135deg,#1a1a2e,#16213e);color:white;font-family:Arial;padding:40px}h1{text-align:center;color:#667eea}.card{background:rgba(255,255,255,0.1);padding:30px;border-radius:15px;margin:20px 0}.client{background:rgba(255,255,255,0.05);padding:20px;margin:10px 0;border-radius:8px;border-left:4px solid #667eea}</style></head><body><div style="max-width:1200px;margin:0 auto"><h1>🎬 VhsMemories</h1><div class="card"><h2>✅ Server is LIVE!</h2><p>Accès partout avec ton téléphone!</p></div><div class="card"><h2>👥 Clients</h2><div id="clients"></div></div></div><script>fetch('/api/index').then(r=>r.json()).then(d=>{document.getElementById('clients').innerHTML=d.map(c=>'<div class="client"><strong>'+c.name+'</strong> - '+c.quantity+' '+c.type+'</div>').join('')}).catch(e=>console.log('loaded'))</script></body></html>`;

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
  } else if ((req.url === '/api/index' || req.url === '/api/clients') && req.method === 'GET') {
    res.status(200).send(JSON.stringify(clients));
  } else if (req.url === '/api/clients' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const newClient = JSON.parse(body);
      newClient.id = Math.max(...clients.map(c => c.id), 0) + 1;
      clients.push(newClient);
      res.status(201).send(JSON.stringify(newClient));
    });
  } else {
    res.status(200).send(html);
  }
};
