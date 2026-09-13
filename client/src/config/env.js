const isProduction = import.meta.env.VITE_APP_MODE === "production";

console.log(`Environment: ${isProduction ? "production" : "development"}`);

const env = {
  appUrl: isProduction
    ? import.meta.env.VITE_PRODUCTION_APP_URL
    : import.meta.env.VITE_APP_URL,

  apiUrl: isProduction
    ? import.meta.env.VITE_PRODUCTION_API_URL
    : import.meta.env.VITE_API_URL,

  generateSourceMap: import.meta.env.GENERATE_SOURCEMAP === "true",

  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
};

export default env;
