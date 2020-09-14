const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const channels = require('./channels.json');

dotenv.config();
const { BOT_TOKEN } = process.env;
const PREFIX = '!';
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
});

client.on('ready', async () => {
    client.channels.cache.get(channels.botTestingChannelId).send('```INITIATION COMPLETE```');
});

client.on('message', (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) {
        return;
    }

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        message.channel.send('```I CANNOT DO THAT```');
    }
});

client.on('guildMemberAdd', member => {
    member.roles.add('754866704437215304');
});

client.login(BOT_TOKEN);
