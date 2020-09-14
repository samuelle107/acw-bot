module.exports = {
    name: 'ban',
    description: 'Ban a user',
    async execute(message, args) {
        if (message.channel.type === 'DM') {
            message.channel.send('```YOU CANNOT USE THIS HERE```');
        }

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            message.channel.send('```YOU DO NOT HAVE PERMISSION```');

            return;
        }

        const member = message.mentions.members.first();

        if (!member) {
            message.channel.send('```INCLUDE WHO YOU ARE BANNING```');

            return;
        }

        // const authorHighestRole = message.member.highestRole.position;
        // const mentionHighestRole = member.highestRole.position;

        // if (mentionHighestRole >= authorHighestRole) {
        //     return;
        // }

        try {
            await member.ban();
            const banMessage = '```' + `${member.displayName} HAS BEEN BANNED` + '```';
            const gifUrl = 'https://media.discordapp.net/attachments/752946494331551875/754885536530956298/ezgif.com-video-to-gif.gif';
            message.channel.send(banMessage);
            message.channel.send(gifUrl);
        } catch (error) {
            message.channel.send('```THERE WAS A PROBLEM BANNING```');
        }
    }
};
