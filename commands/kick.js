module.exports = {
    name: 'kick',
    description: 'Kick a user',
    async execute(message, args) {
        if (message.channel.type === 'DM') {
            message.channel.send('```YOU CANNOT USE THIS HERE```');
        }

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            message.channel.send('```YOU DO NOT HAVE PERMISSION```');

            return;
        }

        const member = message.mentions.members.first();

        if (!member) {
            message.channel.send('```INCLUDE WHO YOU ARE KICKING```');

            return;
        }

        try {
            await member.kick();
            const kickMessage = '```' + `${member.displayName} HAS BEEN KICKED` + '```';
            const gifUrl = 'https://media.giphy.com/media/ECpTuaJw4kRq0/source.gif';

            message.channel.send(kickMessage);
            message.channel.send(gifUrl);
        } catch (error) {
            message.channel.send('```THERE WAS A PROBLEM KICKING```');
        }
    }
};
