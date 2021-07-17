exports.createPostValidator = (req, res, next) => {
  //to check body
  req.check("body", "Body is Required").notEmpty();
  req.check("body", "Body should be 4 to 2000 characters long").isLength({
    min: 4,
    max: 2000,
  });
  //check for errors
  const errors = req.validationErrors();

  //if there are errors show the first one
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];

    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.userSignUpValidator = (req, res, next) => {
  //to check name
  req.check("name", "Name is required").notEmpty();
  req.check("name", "Name must be at least 3 characters long").isLength({
    min: 3,
    max: 40,
  });

  //check for email
  req.check("email", "Email is required").notEmpty();
  req
    .check("email", "Invalid Email")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
    .isLength({ min: 6, max: 100 })
    .withMessage("Email must contain atleast 6 charactres");

  //check for password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/
    )
    .withMessage(
      "Password must be 8 character long it must contain one special character,one number,one uppercase & one lowercase Character"
    );

  //check for errors
  const errors = req.validationErrors();

  //if there are errors show the first one
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];

    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.passwordResetValidator = (req, res, next) => {
  // check for password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .matches(/\d/)
    .withMessage("must contain a number")
    .withMessage("Password must contain a number");

  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware or ...
  next();
};
