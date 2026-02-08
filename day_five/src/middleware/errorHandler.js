
const errorHandler = (err, req, res, next) => {
  console.error('Error :', err.message);
  try {
    const fs = require('fs');
    const payload = JSON.stringify({
      time: new Date().toISOString(),
      message: err.message,
      stack: err.stack
    }) + '\n';
    fs.appendFileSync(process.cwd() + '/error.log', payload);
  } catch (_) {}

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    message: message
  });
};

module.exports = errorHandler;
