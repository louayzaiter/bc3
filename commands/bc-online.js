const { SlashCommandBuilder } = require("discord.js");
const { owner } = require('../config.json');
const CHALK = require('chalk')
module.exports ={ 
    data: new SlashCommandBuilder()

    .setName('bc-online')
    .setDescription('bc online members')
    .addStringOption(Option => 
        Option
        .setName('message')
        .setDescription('enter yor message')
        .setRequired(true)),

    async execute(interaction, Args) {
    if (!owner.includes(interaction.user.id)) return; 

    const Message = interaction.options.getString('message')
    interaction.guild.members.cache.filter(User => ['online', 'dnd', 'idle', 'invisible'].includes(User.presence?.status)).forEach(Member => {
        if(Member.user.bot) return;
        Member.send({ content: `${Message}\n\n ${Member}` }).then(() => {
            console.log(CHALK.green.bold(`${Member.user.tag} has been Received the Message`))
        }).catch(() => {
            console.log(CHALK.red.bold(`${Member.user.tag} Not Received the Message`))
        })
    })
     interaction.reply({content: `Done Send Online Members`, ephemeral: true})
}
}