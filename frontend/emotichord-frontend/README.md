# EmotiChord frontend

React interface for the EmotiChord mood-to-chord prototype. See the [project README](../../README.md) for supported moods, backend setup, API details and limitations.

From this directory:

```sh
npm ci
npm start
```

The development interface opens at `http://localhost:3000`. Start the backend separately; the frontend calls `http://localhost:8080` by default. Set `REACT_APP_API_URL` in an ignored `.env.local` file to change that address, then restart the development server.

```sh
CI=true npm test -- --watchAll=false
npm run build
```

The interface was bootstrapped with Create React App and currently uses `react-scripts` 5.0.1. Build output and local environment files are ignored by Git.
