# Black TempMail

Free temporary email generator — nijer temp mail, nijer Vercel.

- **Website + API, dutai Vercel-e:** frontend `index.html`, backend `api/*.js` (Vercel Serverless Functions) — API gula mail.tm er free API ke proxy kore.
- **OTP auto-detect:** mail aslei 4–8 digit code ber kore banner-e dekhay, tap korlei copy.
- **Old address, pore OTP:** prottek address browser-er localStorage-e save thake. "My Addresses" theke purono address khullei abar inbox + OTP dekha jay (address expire na howa porjonto, ~24h).
- **Kono signup / card / API key lage na.**

## Deploy (Vercel)

1. Ei repo ta GitHub-e push koro.
2. [vercel.com/new](https://vercel.com/new) → repo ta import koro → **Deploy** chap dao. Kono environment variable lagbe na.
3. Live link peye jaba — oita-i tomar temp mail website.

## Kivabe kaj kore

1. `GET /api/domains` → mail.tm theke active domain ane.
2. `POST /api/accounts` → notun address banay (`name@domain`, random password).
3. `POST /api/token` → login token ane (token ~30 min thake; expire hole app nijei notun token niye ney).
4. `GET /api/messages` / `GET /api/message?id=` → inbox + full mail pore.
5. Frontend 10 second por por inbox refresh kore; OTP regex (`\b\d{4,8}\b`) diye code ber kore.

## Limit (mail.tm er)

- Account banano: 5 ta / hour / IP. Token: 10 ta / hour / IP. General: 8 request / second / IP.
- Mail ~24 ghonta thake, tarpor delete hoye jay.
- Temp mail important account-e (bank, main Gmail/Facebook) use koro na — OTP miss hole recover kora jabe na.
