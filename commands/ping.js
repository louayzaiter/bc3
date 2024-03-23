const { SlashCommandBuilder } = require("discord.js");

module.exports ={

    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping test'),

    async execute(interaction, client) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    await interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`)   
 
    }
}