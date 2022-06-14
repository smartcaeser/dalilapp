const express = require('express');
const router = express.Router();

var logger = require('../../utils/logger.js');

router.get('/addSoundSession', function (req, res) {

	var childId = req.body.childId;
	var startTime = req.body.startTime;
	var endTime = req.body.endTime;

	console.log("api called with params childId: " + childId + ", startTime: " + startTime + ", endTime: " + endTime)

	let mysqlQuery = `insert into sound_session (child_id, start_time, end_time) values ( ${childId}, '${startTime}', '${endTime}')`;
	console.log("mysql query: " + mysqlQuery)

	mysqlConnection.query(mysqlQuery, function (er, result) {
		if (!er) {
			res.status(200).send("");
		} else {
			res.status(500).send("");
		}
	});

});


var daos = require('../../DAO');

var models = require('../../models');

router.get('/', (req, res) => {
    daos.Answers.findAll({ include: [daos.Questionnaire] }).then(answers => res.json(answers))
});

router.get('/questionnaire', (req, res) => {
    daos.Questionnaire.findAll({ include: [daos.Answers] }).then(questionnaire => res.json(questionnaire))
});

router.get('/count', (req, res) => {
    daos.Answers.count().then(answers => res.json(answers))
});

router.get('/where', (req, res) => {
    daos.Answers.findAll({ where: { answerValue: { [Sequelize.Op.like]: '%i%' } }, limit: 1 }).then(answers => res.json(answers))
});

router.get('/group', (req, res) => {
    daos.Answers.count({ attributes: ['answerValue'], group: ['answerValue'] }).then(answers => res.json(answers))
});
module.exports = router;
