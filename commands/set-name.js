const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const client = require("..");
const { owner } = require('../config.json');
const { execute } = require("./brodcast");
module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-name')
    .setDescription('set name bot ')
    .addStringOption(Option => 
        Option
        .setName('name')
        .setDescription('Add New Name Bot')
        .setRequired(true)),
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return
    const name = interaction.options.getString('name')

    await client.user.setUsername(`${name}`)

    interaction.reply({content: `**Done Change Name Your Bot => ${name}**`, ephemeral: true})


}
}