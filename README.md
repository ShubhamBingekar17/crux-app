# CrUX App

This is a minimal demo full-stack application that queries the Chrome UX Report (CrUX) API and displays results.

Structure:
- backend/ : Node.js Express server that proxies requests to CrUX API.
- frontend/: React + Material UI app (webpack) that calls /api/crux.

Important:
- You must obtain a Google API key with access to the CrUX API and set it in backend/.env as CRUX_API_KEY.

Quickstart (Linux/macOS):

1. Backend
   cd backend
   cp .env
   npm install
   npm run start

2. Frontend
   cd frontend
   npm install
   npm run start
   (Frontend dev server proxies /api to http://localhost:4000)

CrUX API:
This app calls the CrUX endpoint:
POST https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=YOUR_KEY
Body: { "url":"https://example.com", "device":"DESKTOP" }


### Known Issues

- **Search filter**: Tab isn't auto selected when we search a particular url.
- **CORS blocking**: CORS is set to be allow from all origins (Risky in production env).
- **UI enchancements**: UI is not appealing up to the mark.
- **Input Check**: handle url input fields to be checked and verified weather the url are in correct format.


### Next Step
- Provide comparative analytics with different URL's
- Enchance UI with highly mobile friendly responsiveness
