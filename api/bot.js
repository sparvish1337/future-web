// bot.js
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    if (message.content === '!ping') {
        message.reply('Pong!');
    }
});

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) {
    console.error('Discord bot token not found in environment variables.');
    process.exit(1);
}

client.login(token);
