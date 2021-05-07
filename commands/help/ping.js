const Discord = require("discord.js");

module.exports = {
  name: 'ping',
  description: 'mostra o meu ping',
	aliases: ['ws', 'statusping'],
	args: false,
	usage: '<user>',
	cooldown: 3,
	devs: false,
	async execute(client, message, args) {
	    let totalSeconds = client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        let uptime = `🗓️ ${days.toFixed()} dias\n🗓️ ${hours.toFixed()} horas\n🗓️ ${minutes.toFixed()} minutos\n🗓️ ${seconds.toFixed()} segundos`;

        const embed = new Discord.MessageEmbed()
        .setTitle(`Tempo de atividade 🕰️`)
        .setThumbnail("https://imgur.com/WZMylbw.gif")
        .setColor("#8A3BE2")
        .setDescription(`**Estou online há:**\n${uptime}`);
        
       message.channel.send(embed);
	}
};