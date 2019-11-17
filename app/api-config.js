let backendHost = 'http://chattermill-challenge.com';

if (process.env.BACKEND_HOST) {
  backendHost = process.env.BACKEND_HOST;
}

export const API_ROOT = `${backendHost}`;
