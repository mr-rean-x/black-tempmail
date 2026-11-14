// GET /api/domains -> mail.tm theke active domain list ane
const BASE = 'https://api.mail.tm';

module.exports = async (req, res) => {
  try {
    const r = await fetch(BASE + '/domains', { headers: { Accept: 'application/json' } });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: 'mail.tm e connect kora jay nai' });
  }
};
