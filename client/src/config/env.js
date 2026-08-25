const env = {
  appUrl: import.meta.env.VITE_API_URL,
  apiUrl: import.meta.env.VITE_API_API_URL,
  generateSourceMap: import.meta.env.GENERATE_SOURCEMAP === "true",
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
};

export default env;
