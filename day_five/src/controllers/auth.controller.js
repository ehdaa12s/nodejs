
const sendEmail = require('../utils/email');
const AppError = require('../utils/appError');


const users = [];

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }


    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password, 
      verificationToken,
      isVerified: false
    };
    users.push(newUser);


    const message = `Hello ${name}, your verification code is: ${verificationToken}`;
    
    await sendEmail({
      email: newUser.email,
      subject: 'Verify your account',
      message: message
    });

    res.status(201).json({
      status: 'success',
      message: 'User created! Please check your email for the verification code.',
      user: newUser
    });

  } catch (error) {
    next(error);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = users.find(user => user.verificationToken === token);

    if (!user) {
      throw new AppError('Invalid token', 400);
    }

    
    user.isVerified = true;
    user.verificationToken = null;

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully!'
    });

  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

  
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    if (!user.isVerified) {
      throw new AppError('Please verify your email first', 401);
    }

    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      user: user
    });

  } catch (error) {
    next(error);
  }
};
