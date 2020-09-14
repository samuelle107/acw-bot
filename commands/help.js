const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all commands',
    execute(message) {
        const commands = message
            .client
            .commands
            .map(({ name, description }) => `**!${name}** - ${description}`);

        const description = commands.join('\n');

        const embed = new Discord.MessageEmbed().setDescription(description);
        message.channel.send(embed);
    }
};
