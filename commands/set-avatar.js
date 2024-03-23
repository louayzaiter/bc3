const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const client = require("..");
const { owner } = require('../config.json');
const { execute } = require("./brodcast");
module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-avatar')
    .setDescription('set avatar bot ')
    .addStringOption(Option => 
        Option
        .setName('url')
        .setDescription('Add Url Avatar')
        .setRequired(true)),
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return
    const url = interaction.options.getString('url')

    await client.user.setAvatar(`${url}`)

    interaction.reply({content: `**Done Change Avatar Your Bot **`, ephemeral: true})


}
}