const app = require('./config/server');
const userRoutes = require('./routes/userroutes');
app.use(require('./middleware/middleware'));
app.use(userRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
