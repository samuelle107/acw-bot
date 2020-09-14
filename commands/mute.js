module.exports = {
    name: 'mute',
    description: 'Mute a user',
    execute(message, args) {
        if (message.channel.type === 'DM') {
            message.channel.send('```YOU CANNOT USE THIS HERE```');

            return;
        }

        if (!message.member.hasPermission('MANAGE_ROLES')) {
            message.channel.send('```YOU DO NOT HAVE PERMISSION```');

            return;
        }

        const member = message.mentions.members.first();
        const timeLimit = parseInt(args[1], 10);

        if (!member) {
            message.channel.send('```INCLUDE WHO YOU ARE MUTING```');

            return;
        }

        if (!timeLimit) {
            message.channel.send('```INCLUDE HOW LONG YOU ARE MUTING```');

            return;
        }

        // eslint-disable-next-line no-restricted-globals
        if (isNaN(timeLimit)) {
            message.channel.send('```THIS IS NOT A VALID TIME```');

            return;
        }

        const timeInMs = timeLimit * 60000;
        const roles = member.roles.cache;
        const mutedRole = member.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted');
        const muteMessage = '```' + `${member.displayName} HAS BEEN MUTED` + '```';

        member.roles.remove(roles);
        member.roles.add(mutedRole.id);
        message.channel.send(muteMessage);

        setTimeout(() => {
            const unMutedMessage = '```' + `${member.displayName} HAS BEEN UNMUTED` + '```';

            member.roles.add(roles);
            member.roles.remove(mutedRole.id);
            message.channel.send(unMutedMessage);
        }, timeInMs);
    }
};
