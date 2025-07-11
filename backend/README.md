# Backend

This directory contains a very small Express server used during development.
It stores which tarot card was drawn each day in `data/daily-cards.json` so
the mobile app can avoid duplicates and reference the draw in journal entries.

### Quick start

1. Install dependencies

   ```bash
   npm install express cors
   ```

2. Start the server

   ```bash
   node server.ts
   ```

The server listens on port `3000` and exposes `/daily-card` `GET` and `POST`
endpoints for retrieving and storing the daily card id.
