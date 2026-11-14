// GET /api/messages?sid=<sid> -> inbox er mail list (Guerrilla Mail check_email)
const GM = 'https://api.guerrillamail.com/ajax.php';

module.exports = async (req, res) => {
  const sid = req.query && req.query.sid;
  if (!sid) return res.status(400).json({ error: 'sid lagbe' });
  try {
    const r = await fetch(GM + '?f=check_email&seq=0&sid_token=' + encodeURIComponent(sid), {
      headers: { 'User-Agent': 'BlackTempMail/1.0' }
    });
    const text = await r.text();
    if (!r.ok) return res.status(r.status).json({ error: 'guerrillamail error ' + r.status, detail: text.slice(0, 300) });
    let d;
    try { d = JSON.parse(text); } catch (e) { return res.status(502).json({ error: 'guerrillamail bad json', detail: text.slice(0, 300) }); }
    const list = (d.list || []).map(m => ({
      id: m.mail_id,
      subject: m.mail_subject || '(no subject)',
      from: m.mail_from || '',
      intro: m.mail_excerpt || '',
      date: m.mail_date || '',
      timestamp: m.mail_timestamp || 0
    }));
    res.status(200).json({ messages: list, count: list.length });
  } catch (e) {
    res.status(500).json({ error: 'guerrillamail e connect kora jay nai', detail: String((e && e.message) || e) });
  }
};
