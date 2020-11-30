const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
	// will find only currently logged in user's exercises
	Exercise.find()
		.then(docs => res.json(docs))
		.catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
	//will use logged-in user's username
	const username = req.body.username;
	const description = req.body.description;
	//have time picker from hh:mm to hh:mm
	const duration = Number(req.body.duration);
	const date = Date.parse(req.body.date);

	const newExercise = new Exercise({
		username,
		description,
		duration,
		date
	});

	newExercise.save()
		.then(() => res.json('Exercise added!'))
		.catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req, res) => {
	Exercise.findById(req.params.id)
		.then(doc => res.json(doc))
		.catch(err => res.status(400).json("Error: "+err));
})

router.route('/edit/:id').post((req, res) => {
	Exercise.updateOne({ _id: req.params.id }, {
		description: req.body.description,
		duration: Number(req.body.duration),
		date: Date.parse(req.body.date)
	}).then(() => res.json('Exercise updated!'))
		.catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req, res) => {
	Exercise.findByIdAndDelete(req.params.id)
		.then(() => res.json('Exercise deleted!'))
		.catch(err => res.status(400).json("Error: "+err));
});

module.exports = router;
