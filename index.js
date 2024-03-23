const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Bullet server has been running')
});

app.listen(3000, () => {
  console.log('server started');
});
const fs = require('node:fs');
const db = require('quick.db')
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, ActionRowBuilder, MessageEmbed, MessageActionRow, MessageButton,  ButtonBuilder, ButtonStyle, Message } = require('discord.js');
const ms = require('ms')
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildPresences],
		partials: ['CHANNEL'],
  });
module.exports = client;

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	
  if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}require("./deploy-commands.js")

client.login(process.env.token);