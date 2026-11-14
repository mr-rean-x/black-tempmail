# Black TempMail

Free temporary email generator — nijer temp mail, nijer Vercel.

- **Website + API, dutai Vercel-e:** frontend `index.html`, backend `api/*.js` (Vercel Serverless Functions) — API gula Guerrilla Mail er free API ke proxy kore.
- **OTP auto-detect (Quick mode):** mail aslei 4–8 digit code ber kore banner-e dekhay, tap korlei copy.
- **2 ta mode:**
  - **⚡ Quick (~1 hour):** Guerrilla Mail backend (Vercel API). Unlimited address, inbox app-er bhitorei dekha jay, OTP auto-detect hoy. Address ~1 ghonta thake.
  - **♾️ Permanent (YOPmail):** address konodin expire hoy na — 1 bochor poro oi address-e OTP pathale asbe. Mail 8 din thake. Unlimited banano jay, kono API key / quota nai. "My Addresses" list-e save thake — purono address theke 1 tap-e inbox khola jay.
- **Old address, pore OTP:** prottek address browser-er localStorage-e save thake (max 100). "My Addresses" theke purono address khullei abar inbox + OTP dekha jay.
- **Kono signup / card / API key lage na.**

## Backend keno Guerrilla Mail?

Prothome mail.tm use korsilam — kintu mail.tm Vercel er server theke asha request 403 diye block kore dey (live test kora). Guerrilla Mail er API Vercel thekeo chole. Tai backend bodlano hoise.

Limit (Guerrilla Mail er):
- Address ar mail ~1 ghonta thake, tarpor expire hoye jay.
- Guerrilla spam filter kore — spam hisebe dhora mail inbox-e ashe na. OTP legit sender (Google, Facebook, WhatsApp ityadi) theke ashle thik moto ashe.
- Temp mail important account-e (bank, main Gmail/Facebook) use koro na — OTP miss hole recover kora jabe na.

## Permanent mode keno YOPmail er site-e inbox khole?

YOPmail er inbox app-er bhitore pora jay na — YOPmail er webmail ekhon Cloudflare Turnstile challenge chay, ar server theke (Vercel) mail porar rasta 403 diye block hoy (official library er flow diyeo test kora — `finrmail(-1)`). Tai Permanent address er inbox YOPmail er nijer site-e khole — okhane 1 bar check solve korlei mail dekha jay. Address banate kono server call lage na — mail pathalei inbox toiri hoye jay.

Onno option gulao check kora hoise:
- **Tmailor Open API:** address konodin expire hoy na, kintu free plan-e 100 mailbox / 30 din ar 1 ta fixed IP allowlist lage — Vercel er IP bodlay, tai free te cholbe na. Paid plan card chay.
- **mail.tm:** Vercel theke 403 dey, ar terms-e proxy kora mana.
- Tai free + unlimited + lifetime er jonno YOPmail-i ekmatro rasta — inbox YOPmail er site-e khola tai ekhane trade-off.

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
