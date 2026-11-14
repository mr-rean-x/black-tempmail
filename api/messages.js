// GET /api/messages -> inbox er mail list (Authorization: Bearer <token> header lagbe)
const BASE = 'https://api.mail.tm';

module.exports = async (req, res) => {
  try {
    const r = await fetch(BASE + '/messages', {
      headers: {
        Accept: 'application/json',
        Authorization: req.headers.authorization || '',
        'User-Agent': 'BlackTempMail/1.0 (+https://github.com/mr-rean-x/black-tempmail)'
      }
    });
    const text = await r.text();
    if (!r.ok) return res.status(r.status).json({ error: 'mail.tm error ' + r.status, detail: text.slice(0, 300) });
    try {
      res.status(200).json(JSON.parse(text));
    } catch (e) {
      res.status(502).json({ error: 'mail.tm bad json', detail: text.slice(0, 300) });
    }
  } catch (e) {
    res.status(500).json({ error: 'mail.tm e connect kora jay nai', detail: String((e && e.message) || e) });
  }
};
