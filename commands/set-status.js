const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const client = require("..");
const { owner } = require('../config.json');
const { execute } = require("./brodcast");
module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-status')
    .setDescription('set name bot ')
    .addStringOption(Option => 
        Option.setName('status')
        .setDescription('Select Status Your Bot')
        .setRequired(true)
        .addChoices(
            { name: 'idle', value: 'idle' },
            { name: 'online', value: 'online' },
            { name: 'dnd', value: 'dnd' },))
    .addStringOption(Option => 
        Option
        .setName('activity')
        .setDescription('Add New activity Bot')
        .setRequired(true)),
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return
    const status = interaction.options.getString('status')
    const activity = interaction.options.getString('activity')

    await client.user.setStatus(`${status}`)
    await client.user.setActivity(`${activity}`)
    interaction.reply({content: `**Done Change Name Your Bot => ${status}**`, ephemeral: true})


}
}