// POST /api/accounts {address, password} -> notun temp mail account banay
const BASE = 'https://api.mail.tm';

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  try {
    const r = await fetch(BASE + '/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'BlackTempMail/1.0 (+https://github.com/mr-rean-x/black-tempmail)'
      },
      body: JSON.stringify(req.body || {})
    });
    const text = await r.text();
    if (!r.ok) return res.status(r.status).json({ error: 'mail.tm error ' + r.status, detail: text.slice(0, 300) });
    try {
      res.status(r.status).json(JSON.parse(text));
    } catch (e) {
      res.status(502).json({ error: 'mail.tm bad json', detail: text.slice(0, 300) });
    }
  } catch (e) {
    res.status(500).json({ error: 'mail.tm e connect kora jay nai', detail: String((e && e.message) || e) });
  }
};
