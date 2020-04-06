export const isProd = process.env.PREACT_APP_CONTEXT === "production";
export const isClient = typeof window !== "undefined";