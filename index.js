const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const bunyan = require('bunyan');
const channels = require('./channels.json');

dotenv.config();
const { BOT_TOKEN } = process.env;
const log = bunyan.createLogger({ name: 'aCruelBot' });
const PREFIX = '!';
const client = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL) } });
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
});

client.on('ready', async () => {
    client.channels
        .fetch(channels.botTestingChannelId)
        .then(channel => channel.send('INITIATION COMPLETE'));
    log.info('Bot has started');
});

client.on('message', (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) {
        return;
    }

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    try {
        client.commands.get(command).execute(message, args);
        log.info(command);
    } catch (error) {
        message.channel.send('```I CANNOT DO THAT```');
        log.error(error);
    }
});

client.on('guildMemberAdd', member => {
    member.roles.add('754866704437215304');
    log.info(`${member.displayName} has joined`);
});

client.login(BOT_TOKEN);
