// GET /api/messages -> inbox er mail list (Authorization: Bearer <token> header lagbe)
const BASE = 'https://api.mail.tm';

module.exports = async (req, res) => {
  try {
    const r = await fetch(BASE + '/messages', {
      headers: { Accept: 'application/json', Authorization: req.headers.authorization || '' }
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: 'mail.tm e connect kora jay nai' });
  }
};
