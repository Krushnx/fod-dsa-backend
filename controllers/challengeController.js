const express = require('express');
const mongoose = require('mongoose');
const Challenge = require('../models/challengeSchema'); // Adjust the path as necessary

// Get all challenges
const getAllChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.status(200).json(challenges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a challenge by ID
const getChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (challenge) {
            res.status(200).json(challenge);
        } else {
            res.status(404).json({ message: "Challenge not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Post a new challenge
const postChallenge = async (req, res) => {
    const { name, sections, questionCount, questions } = req.body;

    const newChallenge = new Challenge({
        name,
        sections,
        questionCount,
        questions
    });

    try {
        const savedChallenge = await newChallenge.save();
        res.status(201).json(savedChallenge);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const markQuestionAsSolved = async (req, res) => {
    const { userId } = req.body;
    const { questionId, challengeId } = req.params;

    try {
        // Find the challenge
        const challenge = await Challenge.findById(challengeId);

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found.' });
        }

        // Ensure questions array exists in challenge document
        if (!challenge.questions) {
            return res.status(400).json({ error: 'Questions array not found in challenge document.' });
        }

        // Find the question within the challenge's questions array
        const question = challenge.questions.find(q => q._id == questionId);

        if (!question) {
            return res.status(404).json({ error: 'Question not found in the challenge.' });
        }

        const userIdIndex = question.solvedBy.indexOf(userId);

        if (userIdIndex !== -1) {
            // User already marked as solved, so remove userId from solvedBy array
            question.solvedBy.splice(userIdIndex, 1);
        } else {
            // User not marked as solved, so add userId to solvedBy array
            question.solvedBy.push(userId);
        }
        // Add userId to solvedBy array

        // Save the updated challenge
        await challenge.save();

        // Respond with success message or updated challenge object
        res.status(200).json({ message: 'Question marked as solved successfully.', challenge });

    } catch (error) {
        console.error('Error marking question as solved:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { postChallenge, getAllChallenges, getChallenge, markQuestionAsSolved };