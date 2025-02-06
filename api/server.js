// api/server.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose'); // MongoDB library

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
app.use(bodyParser.json());

// Middleware to wait for the bot to be ready
function ensureBotReady(req, res, next) {
    if (!client.readyAt) {
        return res.status(503).json({ error: 'Discord bot is not yet ready.' });
    }
    next();
}

// Example schema and model for Teams
const teamSchema = new mongoose.Schema({
  name: String,
  players: [String],
});
const Team = mongoose.model('Team', teamSchema);

// Endpoint to get teams data
app.get('/api/teams', ensureBotReady, async (req, res) => {
    try {
        const teamsData = await Team.find();
        res.json(teamsData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams.' });
    }
});

// Similarly, create models and endpoints for Players and Matches

const port = process.env.PORT || 3001;
client.login(process.env.DISCORD_BOT_TOKEN).then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
