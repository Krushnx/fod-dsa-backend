const express = require('express');
const router = express.Router();

const {getAllChallenges , getChallenge , postChallenge,markQuestionAsSolved} = require('../controllers/challengeController')



router.get('/', getAllChallenges);
router.get('/:id', getChallenge);
router.post('/', postChallenge);
router.put('/:challengeId/questions/:questionId/solve', markQuestionAsSolved);


module.exports = router;