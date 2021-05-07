const Discord = require("discord.js");
const firebase = require("firebase");
const canvacord = require("canvacord");
const database = firebase.database();

module.exports = {
  name: 'xp',
  description: 'Mostra o seu xp card',
	aliases: ['level', 'exp'],
	args: false,
	usage: '<user>',
	cooldown: 10,
	devs: false,
	async execute(client, message, args) {
	    let links = [
	        "https://imgur.com/e0YFo5D.jpeg",
	        "https://imgur.com/oqtfc2D.jpeg",
	        "https://imgur.com/RKc0yDs.jpeg",
	        "https://imgur.com/ETiF3Vp.jpeg",
	        "https://imgur.com/cnKhT7S.jpeg",
	        "https://imgur.com/dtYDmdu.jpeg"
	    ]
	    let ale = links[Math.floor(Math.random() * links.length)]
	    let user = message.author 
	    let avatar = user.avatarURL({ dynamic: false, format: "png", size: 1024 });
	    let tag = user.discriminator;
	    let name = user.username
	    let status = user.presence.status;
	   
	    database.ref(`Xp/${message.author.id}`).once("value")
	    .then(async function(db) {
	    
	        const rank = new canvacord.Rank()
	        .setUsername(name)
	        .renderEmojis(true)
	        .setAvatar(avatar)
	        .setDiscriminator(tag)
	        .setStatus(status)
          .setCurrentXP(db.val().xp)
          .setRequiredXP(db.val().limite)
          .setLevel(db.val().level)
          .setRank(1, "RANK" , false)
          .setProgressBar("#FFFFFF", "COLOR")
          .setBackground("IMAGE", `${ale}`)

          rank.build()
              .then(data => {
                  const attachment = new Discord.MessageAttachment(data, "xpelevel.png");
                  message.channel.send(attachment);
              });
	    })
	}
};