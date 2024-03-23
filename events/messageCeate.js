const { Events, Message } = require("discord.js");
const map = new Map();
const  db  = require("quick.db");
const { user } = require("..");
const LIMIT = 5;
const TIME = 7000;
const DIFF = 50000;

module.exports = {
  name: Events.MessageCreate,
  /**
    @param {Message} message
  */
  
  async execute(message) {
    try {
    if (message.author.bot || !message.guild) return;
    let spamStatus = await db.get(`Antispam_${message.channel.id}`);
    if (spamStatus === true) {

      if (map.has(message.author.id)) {
        const authorData = map.get(message.author.id);
        const { lastmsg, timer } = authorData;
        let timeBeetwenEachMessage = message.createdTimestamp - lastmsg.createdTimestamp;
        let messages = authorData.messages;

        if (timeBeetwenEachMessage > DIFF) {
          clearTimeout(timer);
          authorData.messages = 1;
          authorData.lastmsg = message;

          authorData.timer = setTimeout(() => {
            map.delete(message.author.id)
          }, TIME)

          map.set(message.author.id, authorData);
        } else {
          ++messages;
          if (parseInt(messages) === LIMIT) {
            let muterole = message.guild.roles.cache.find(r => r.name == "Muted")
            if(!muterole){
              try{
                muterole = await message.guild.roles.create({
                  name: "Muted",
                  color: "#000000",
                  permissions:[]
                })
                message.guild.channels.cache.forEach(async (channel) => {
                  await channel.permissionOverwrites.set(muterole, {
                    SendMessages: false,
                  });
                });
              }catch (err) {
                console.log(err)
              }
            }
          
          
            await message.member.roles.add(muterole.id);
            return message.author.send(`<@${message.author.id}> Has Been Muted For Spam`);
          }
          else {
            authorData.messages = messages;
            map.set(message.author.id, authorData);
        }
      }
    } else {
        let remove = setTimeout(() => {
          map.delete(message.author.id)
        }, TIME)

        map.set(message.author.id, {
          messages: 1,
          lastmsg: message,
          timer: remove,
        })
    }
  } else return;
}catch (err) {
    console.log(err)
}}}