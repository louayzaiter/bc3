const { SlashCommandBuilder } = require("discord.js");
const CHALK = require('chalk');
const { owner } = require('../config.json');
module.exports ={ 
    data: new SlashCommandBuilder()

    .setName('bc-all')
    .setDescription('bc all members')
    .addStringOption(Option => 
        Option
        .setName('message')
        .setDescription('enter yor message')
        .setRequired(true)),

    async execute(interaction, Args) {
    if (!owner.includes(interaction.user.id)) return;

    const Message = interaction.options.getString('message')
    interaction.guild.members.cache.forEach(Member => {
        if(Member.user.bot) return;
        Member.send({ content: `${Message}\n\n ${Member}` }).then(() => {
            console.log(CHALK.green.bold(`${Member.user.tag} has been Received the Message`))
        }).catch(() => {
            console.log(CHALK.red.bold(`${Member.user.tag} Not Received the Message`))
        })
    })
     interaction.reply({content: `Done Send All Members`, ephemeral: true})
}
}