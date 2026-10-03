# EmotiChord

A small music-themed web application that suggests a chord progression for a mood. The React interface calls a Java/Spring Boot REST API and displays a key, Roman-numeral progression, tempo, style and description.

This is a personal learning prototype. It uses a fixed set of mood-to-progression mappings; it does not use AI or generate playable audio.

## What the project demonstrates

- Connecting a React interface to a JSON API with loading and error states.
- Separating a Spring Boot application into controller, service and model classes.
- Normalising user input and providing a fallback for unsupported moods.
- Working with Java, JavaScript, HTTP, Gradle and npm in one repository.

## Current behaviour

The supported inputs are `joy`, `happy`, `sad`, `melancholy`, `excited`, `energetic`, `romantic` and `love`. Matching ignores capitalisation and surrounding spaces. Other inputs return a default C-major progression. Suggestions are predefined examples, and the association between mood and music is subjective.

For example, `joy` returns:

```json
{
  "key": "C Major",
  "progression": "I-V-vi-IV",
  "tempo": 120,
  "style": "Pop",
  "description": "Bright and uplifting - perfect for happy moments"
}
```

## Run locally

Requirements: JDK 21, Node.js and npm. The repository includes the Gradle wrapper and npm lockfile. Its backend uses Spring Boot 3.5.8; its frontend uses React 19 and Create React App tooling.

Start the backend in one terminal:

```sh
cd backend/emotichord-backend
./gradlew bootRun
```

On Windows, use `gradlew.bat bootRun`. The API starts on `http://localhost:8080` by default.

Start the frontend in another terminal:

```sh
cd frontend/emotichord-frontend
npm ci
npm start
```

Open `http://localhost:3000`, enter a supported mood and select **Find progression**. Both applications must be running.

To use a different API address, set `REACT_APP_API_URL` in `frontend/emotichord-frontend/.env.local`, then restart the frontend. For example:

```dotenv
REACT_APP_API_URL=http://localhost:8081
```

The backend port can be changed with Spring Boot's `SERVER_PORT` environment variable. Keep the frontend API address in step with that port. Frontend environment variables are included in the browser bundle, so they must not contain secrets.

You can also call the API directly:

```sh
curl "http://localhost:8080/api/generate?emotion=joy"
```

## Checks

From the backend directory:

```sh
./gradlew test
```

From the frontend directory:

```sh
CI=true npm test -- --watchAll=false
npm run build
```

The frontend tests cover requesting a progression, handling failed requests and disabling empty input. The backend test checks that the Spring application starts.

## Repository layout

```text
backend/emotichord-backend/     Spring Boot API and Gradle wrapper
frontend/emotichord-frontend/   React interface and npm lockfile
```

## Limitations and possible next steps

There is no audio/MIDI playback, database, authentication or deployed demo. The API accepts cross-origin requests and is intended for local exploration. The frontend still uses Create React App tooling. Useful next steps include service/API tests, reviewing dependency updates, improving input validation and adding chord playback.

Created by [Alex Byrne](https://github.com/ajbyrne91).
