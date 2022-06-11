export default {
  port: process.env.PORT || 5001,
  environment: process.env.NODE_ENV || "development",
  dbConnect: process.env.DB_CONNECT,
  version: "0.1.0",
  jwtKey: process.env.JWT_KEY || "mYl1TTl3s3cR3t",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "30d",
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS || 10,
};
