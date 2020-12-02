const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const keys = require('../config/.env');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

let User = require('../models/user.model');

router.route('/').get((req, res) => {
	User.find()
		.then(docs => res.json(docs))
		.catch(err => res.status(400).json('Error: '+err));
});

// do this with oauth2
router.route('/register').post((req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid)
		return res.status(400).json(errors);

	User.findOne({ email: req.body.email })
		.then(doc => {
			if (doc)
				return res.status(400).json({email: "Invalid email: Already exists."});

			const newUser = new User({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save()
						.then(user => res.json(user))
						// .catch(err => console.log("backend: users: ", err));
				});
			});
		});
});

// do this with oauth2
router.route('/login').post((req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid)
		return res.status(400).json(errors);

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({email: email})
		.then(user => {
			if (!user)
				return res.status(400).json({ emailnotfound: "Email not found!" });
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if (isMatch) {
						const payload = {
							id: user.id,
							name: user.username
						}

						jwt.sign(
							payload,
							process.env.SECRET_OR_KEY,
							{
								expiresIn: 31556926
							},
							(err, token) => {
								res.json({
									success: true,
									token: "Bearer "+token
								});
							}
						);
					} else {
						return res.status(400).json({ passwordincorrect: "Password incorrect!" });
					}
				})
		}).catch(err => res.status(400).json('Error: '+err));

});

module.exports = router;
