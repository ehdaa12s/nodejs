
require('dotenv').config();
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/post.routes');
const AppError = require('./utils/appError');

const app = express();


app.use(express.json());


app.use('/auth', authRouter);
app.use('/posts', postRouter);


app.use((req, res, next) => {
  next(new AppError(`Not Found - ${req.originalUrl}`, 404));
});


app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
