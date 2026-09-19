let clients = [
  { id: 1, name: 'Dumas Benjamin', type: 'VHS', quantity: 15, montant: 225, status: 'En cours' },
  { id: 2, name: 'Luc Bruno', type: 'Diapositives', quantity: 1, montant: 0, status: 'En attente' }
];

const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>VhsMemories</title><style>body{background:linear-gradient(135deg,#1a1a2e,#16213e);color:white;font-family:Arial;padding:40px}h1{text-align:center;color:#667eea}.card{background:rgba(255,255,255,0.1);padding:30px;border-radius:15px;margin:20px 0}.client{background:rgba(255,255,255,0.05);padding:20px;margin:10px 0;border-radius:8px;border-left:4px solid #667eea}</style></head><body><div style="max-width:1200px;margin:0 auto"><h1>🎬 VhsMemories ONLINE!</h1><div class="card"><h2>✅ Server is LIVE on Vercel!</h2><p>Accès de partout avec ton téléphone!</p></div><div class="card"><h2>👥 Clients</h2><div id="clients"><strong>Dumas Benjamin</strong> - 15 VHS<br><strong>Luc Bruno</strong> - 1 Diapositives</div></div></div></body></html>`;

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).end(html);
};
