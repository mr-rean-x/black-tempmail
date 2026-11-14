# Black TempMail

Free temporary email generator — nijer temp mail, nijer Vercel.

- **Website + API, dutai Vercel-e:** frontend `index.html`, backend `api/*.js` (Vercel Serverless Functions) — API gula Guerrilla Mail er free API ke proxy kore.
- **OTP auto-detect:** mail aslei 4–8 digit code ber kore banner-e dekhay, tap korlei copy.
- **Old address, pore OTP:** prottek address (ar tar session id) browser-er localStorage-e save thake. "My Addresses" theke purono address khullei abar inbox + OTP dekha jay — address ~1 ghonta thake.
- **Kono signup / card / API key lage na.**

## Backend keno Guerrilla Mail?

Prothome mail.tm use korsilam — kintu mail.tm Vercel er server theke asha request 403 diye block kore dey (live test kora). Guerrilla Mail er API Vercel thekeo chole. Tai backend bodlano hoise.

Limit (Guerrilla Mail er):
- Address ar mail ~1 ghonta thake, tarpor expire hoye jay.
- Guerrilla spam filter kore — spam hisebe dhora mail inbox-e ashe na. OTP legit sender (Google, Facebook, WhatsApp ityadi) theke ashle thik moto ashe.
- Temp mail important account-e (bank, main Gmail/Facebook) use koro na — OTP miss hole recover kora jabe na.

## Deploy (Vercel)

1. Ei repo ta GitHub-e push koro.
2. [vercel.com/new](https://vercel.com/new) → repo ta import koro → **Deploy** chap dao. Kono environment variable lagbe na.
3. Live link peye jaba — oita-i tomar temp mail website.

**Important:** Deploy er por Vercel er **Deployment Protection (Vercel Authentication)** OFF korte hobe, na hole public keu site khulte parbe na — Settings → Deployment Protection → Vercel Authentication off.

## Kivabe kaj kore

1. `POST /api/accounts` → Guerrilla Mail e notun address banay (custom name dile setao), session id (`sid`) ferot dey.
2. `GET /api/messages?sid=` → inbox check kore (15 second por por auto-refresh).
3. `GET /api/message?id=&sid=` → ekta mail er full body pore.
4. Frontend OTP regex (`\b\d{4,8}\b`) diye code ber kore banner-e dekhay.
