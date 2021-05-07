const Discord = require("discord.js");
const { prefix } = require("../../config.json");

module.exports = {
  name: 'comandos',
  description: 'mostra a minha lista de comandos',
	aliases: ['commands', 'comando'],
	args: false,
	usage: '<user>',
	cooldown: 5,
	devs: false,
	async execute(client, message, args) {
	    if  (!args[0]) {
	        const { commands } = message.client;
	        
	        let embed1 = new Discord.MessageEmbed()
	        .setTitle(`Minha lista de comandos`)
	        .setDescription(`${commands.map(commands => commands.name).join(", ")}\n\nVocê pode usar o comando \`${prefix}comando <comando> \` para obter informações de um comando em especifico!`)
	        .setTimestamp()
	        .setColor("#8A2BE2");
	        
	       return message.author
	       .send(embed1)
	       .then(() => {
	           message.reply(`A minha lista de comandos foi enviado na sua DM!`);
	       })
	       .catch(error => {
	           console.log(`n foi possivel enviar a a lista para ${message.author.tag}`);
	           message.reply(`Não foi possivel enviara lista na dua DM \ntente verficar se você desativou as mensagens diretas!!`);
	       });
	    } else {
	        const { commands } = message.client;
	        const command = commands.get(args[0]) || commands.find(c => c.aliases && c.aliases.includes(args[0]));
	        
	        if (!command) {
	            return message.reply("Você esqueceu de dizer o comando!");
	        }
	        let branco = `ㅤ`;
	        let usagi = command.usage || branco;
	        
	        let embed2 = new Discord.MessageEmbed()
	        .setTitle(`Info`)
	        .setFooter(`Autor: ${message.author.username}`)
	        .setTimestamp()
	        .setColor("#8A2BE2")
	        .setDescription(
                `Nome do comando: ${command.name}
Aliases: ${command.aliases.join(", ")}
Descrição: ${command.description}
Como se usa: ${prefix}${command.name} ${command.usage || branco}
Cooldown: ${command.cooldown || 3} segundos
`);

           message.channel.send(embed2);
	        
	    }
	}
};