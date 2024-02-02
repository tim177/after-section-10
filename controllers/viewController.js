/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  //1) Get the data from collections
  const tours = await Tour.find();

  //2) buid Template
  // 3) render the templates using tour data
  res.status(200).render('overview', {
    title: 'all Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug });

  if (!tour) return next(new AppError('There is no tour with that name', 404));

  //2) Build Template
  //3) Render Template using data1
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account user',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create your account user',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
    user: req.user,
  });
};

//TODO: Booking tour
// exports.getMyTours = catchAsync(async (req, res, next) => {
//   //1) Find all bookings
//   const bookings = await Booking.find({ user: req.user.id });

//   //2) Find tours with the returned Id
//   const tourIDs = bookings.map((el) => el.tour);
//   const tours = await Tour.find({ _id: { $in: tourIDs } });

//   res.status(200).render('overview', {
//     title: 'My Tours',
//     tours,
//   });
// });

// .set(
//   'Content-Security-Policy',
//   "connect-src 'self' https://cdnjs.cloudflare.com",
// )

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
