const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
	User.find()
		.then(docs => res.json(docs))
		.catch(err => res.status(400).json('Error: '+err));
});
// do this with oauth2
router.route('/register').post((req, res) => {
	const username = req.body.username;
	const newUser = new User({ username });

	newUser.save()
		.then(() => res.json('User registered!'))
		.catch(err => res.status(401).json('Error: '+err));
});
// do this with oauth2
router.route('/login').post((req, res) => {
	const username = req.body.username;
	User.findOne({username: username})
		.then(user => res.json('Logged in!'))
		.catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;
