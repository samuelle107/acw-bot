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

        try {
            await member.ban();
            const banMessage = '```' + `${member.displayName} HAS BEEN BANNED` + '```';
            message.channel.send(banMessage);
        } catch (error) {
            message.channel.send('```THERE WAS A PROBLEM BANNING```');
        }
    }
};
