const env = {
  appUrl: import.meta.env.VITE_APP_URL,
  apiUrl: import.meta.env.VITE_API_URL,
  generateSourceMap: import.meta.env.GENERATE_SOURCEMAP === "true",
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
};

export default env;
