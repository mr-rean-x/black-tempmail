// GET /api/message?id=<id> -> ekta mail er full body (Authorization: Bearer <token> header lagbe)
const BASE = 'https://api.mail.tm';

module.exports = async (req, res) => {
  const id = req.query && req.query.id;
  if (!id) return res.status(400).json({ error: 'id lagbe' });
  try {
    const r = await fetch(BASE + '/messages/' + encodeURIComponent(id), {
      headers: { Accept: 'application/json', Authorization: req.headers.authorization || '' }
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: 'mail.tm e connect kora jay nai' });
  }
};
