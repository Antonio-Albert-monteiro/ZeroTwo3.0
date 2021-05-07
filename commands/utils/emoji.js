const Discord = require("discord.js");

module.exports = {
  name: "emoji",
  description: 'mostra o id do emoji escolhido',
  aliases: ["emoji-info", "emoji-id"],
  args: true,
  usage: "<nomedoemoji>",
  cooldown: 5,
  devs: false,
  async execute(client, message, args) {
    message.delete();

    let emoji = message.guild.emojis.cache.find(
      emoji => emoji.name === args[0]
    );
    if (!emoji) {
      message.channel.send(
        `${args[0]} não é um emoji deste servidor ou é um emoji padrão`
      );
    } else {
      let emojinfo = new Discord.MessageEmbed()
        .setTitle("Emoji-info")
        .setDescription(`Nome do emoji: ${args[0]} \nId do emoji: ${emoji.id}id\nGif: ${emoji.animated}`)
        .setColor("#8A2BE2");

      message.channel.send(emojinfo);
    }
  }
};
