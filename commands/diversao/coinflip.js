const Discord = require("discord.js");

module.exports = {
  name: 'coinflip',
  description: 'Vamos brincar de cara ou coroa?',
	aliases: ['cara', 'coroa'],
	args: true,
	usage: '<cara> || <coroa>',
	cooldown: 3,
	devs: false,
	async execute(client, message, args) {
	    let array1 = ["cara", "coroa"];
	    let rand = Math.floor(Math.random() * array1.length);
	    
	    if (!args[0] || (args[0].toLowerCase() !== "cara" && args[0].toLowerCase() !== "coroa")) {
	        message.reply("insira **cara** ou **coroa** na frente do comando.");
	    } else if (args[0].toLowerCase() == array1[rand]) {
	        message.channel.send("Deu **" + array1[rand] + "**, você ganhou dessa vez!");
	    } else if (args[0].toLowerCase() != array1[rand]) {
	        message.channel.send("Deu **" + array1[rand] + "**, você perdeu dessa vez!");
	    }
	}
};