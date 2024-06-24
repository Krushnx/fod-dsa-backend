const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sections: { type: Number, required: true },
    questionCount: { type: Number, required: true },
    questions: [
        {
            questionName: { type: String, required: true },
            questionSection: { type: String, required: true },
            difficulty: { type: String, required: true },
            leetcode: { type: String, required: true },
            gfg: { type: String, required: true },
            solution: { type: String, required: true },
            solvedBy: { type: [String], default: [] }

        }
    ]
});

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
    