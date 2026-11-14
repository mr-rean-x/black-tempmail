// POST /api/accounts {name?} -> notun temp mail address banay (Guerrilla Mail)
// Returns { address, sid } — sid tai inbox er credential, hariyo na.
const GM = 'https://api.guerrillamail.com/ajax.php';

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  try {
    const name = ((req.body && req.body.name) || '').replace(/[^a-zA-Z0-9._-]/g, '').toLowerCase();
    // 1. random address + session
    let r = await fetch(GM + '?f=get_email_address&lang=en', {
      headers: { 'User-Agent': 'BlackTempMail/1.0' }
    });
    let text = await r.text();
    if (!r.ok) return res.status(r.status).json({ error: 'guerrillamail error ' + r.status, detail: text.slice(0, 300) });
    let d;
    try { d = JSON.parse(text); } catch (e) { return res.status(502).json({ error: 'guerrillamail bad json', detail: text.slice(0, 300) }); }
    if (!d.sid_token || !d.email_addr) return res.status(502).json({ error: 'guerrillamail bad reply', detail: text.slice(0, 300) });

    // 2. custom name chaile set koro
    if (name) {
      r = await fetch(GM + '?f=set_email_user&email_user=' + encodeURIComponent(name) + '&sid_token=' + encodeURIComponent(d.sid_token) + '&lang=en', {
        headers: { 'User-Agent': 'BlackTempMail/1.0' }
      });
      text = await r.text();
      if (r.ok) {
        try {
          const d2 = JSON.parse(text);
          if (d2.email_addr && !d2.alias_error) d.email_addr = d2.email_addr;
        } catch (e) { /* name set fail korle random address-i thakbe */ }
      }
    }
    res.status(200).json({ address: d.email_addr, sid: d.sid_token });
  } catch (e) {
    res.status(500).json({ error: 'guerrillamail e connect kora jay nai', detail: String((e && e.message) || e) });
  }
};
