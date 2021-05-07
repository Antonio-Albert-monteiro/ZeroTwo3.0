const Discord = require("discord.js");

module.exports = {
  name: 'kiss',
  description: 'beija um usuario',
	aliases: ['beijar', 'selinho'],
	args: true,
	usage: '<user>',
	cooldown: 3,
	devs: false,
	async execute(client, message, args) {
	    var list = [
	        'https://imgur.com/iclUiUN.gif',
	        'https://imgur.com/lYQt9rx.gif',
	        'https://imgur.com/w1TU5mR.gif',
	        'https://imgur.com/gXYpFkq.gif',
          'https://imgur.com/itPeiSA.gif',
          'https://imgur.com/nXfDKRk.gif',
          'https://imgur.com/5uH8BvY.gif'
	    ];
	    var rand = list[Math.floor(Math.random() * list.length)];
	    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
	    if (!user) {
	        return message.reply('**Mencione um usuário válido para beijar!**');
	    }
	    
	    let avatar = message.author.displayAvatarURL({format: 'png'});
	    const embed = new Discord.MessageEmbed()
        .setTitle('Kiss')
        .setColor('#8A2BE2')
        .setDescription(`${message.author} acabou de beijar ${user}`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter('Até que forma um bom casal')
        .setAuthor(message.author.tag, avatar);
       await message.channel.send(embed);
	}
};