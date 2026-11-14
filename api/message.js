// GET /api/message?id=<mail_id>&sid=<sid> -> ekta mail er full body (Guerrilla Mail fetch_email)
const GM = 'https://api.guerrillamail.com/ajax.php';

module.exports = async (req, res) => {
  const id = req.query && req.query.id;
  const sid = req.query && req.query.sid;
  if (!id || !sid) return res.status(400).json({ error: 'id ar sid lagbe' });
  try {
    const r = await fetch(GM + '?f=fetch_email&email_id=' + encodeURIComponent(id) + '&sid_token=' + encodeURIComponent(sid), {
      headers: { 'User-Agent': 'BlackTempMail/1.0' }
    });
    const text = await r.text();
    if (!r.ok) return res.status(r.status).json({ error: 'guerrillamail error ' + r.status, detail: text.slice(0, 300) });
    let d;
    try { d = JSON.parse(text); } catch (e) { return res.status(502).json({ error: 'guerrillamail bad json', detail: text.slice(0, 300) }); }
    res.status(200).json({
      subject: d.mail_subject || '(no subject)',
      from: d.mail_from || '',
      body: d.mail_body || '',
      date: d.mail_date || ''
    });
  } catch (e) {
    res.status(500).json({ error: 'guerrillamail e connect kora jay nai', detail: String((e && e.message) || e) });
  }
};
