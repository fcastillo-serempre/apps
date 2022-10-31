export const config = {
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3333,
  db: {
    uri: process.env.MONGODB_URI,
    name: process.env.DB_NAME,
  },
};
