export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/taskflow',
  jwtSecret: process.env.JWT_SECRET || 'taskflow-local-demo-secret',
});
