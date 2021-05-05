const Discord = require("discord.js");

module.exports = {
	name: 'ping',
	description: 'usado para ver o meu ping',
	aliases: ['latencia', 'fps'],
	async execute(client, message, args) {
	    let botMsg = await message.channel.send("〽️ Pining");
	    const timeTaken = Date.now() - message.createdTimestamp;
    
      const embed = new Discord.MessageEmbed()
      .addField("Latência do server: ", `${timeTaken}`)
      .addField("Two: ", `${Math.round(botMsg.createdAt - message.createdAt)}ms!`)
      .addField("Latência da API:", `${Math.round(client.ws.ping)}ms!`)
      .setColor("8A2BE2")
        
     botMsg.edit(" ", embed);
	}
};