export const jwtConstants = {
  secret: process.env.JWT_REFRESH_SECRET || "secretKey",
  secretRefresh: process.env.JWT_ACCESS_SECRET || "secretKeyRefresh",
};
