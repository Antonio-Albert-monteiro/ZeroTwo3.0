const client = require("../index.js");
const Discord = require("discord.js");
const firebase = require("firebase");
const fs = require("fs");
const database = firebase.database();
const config = require("../config.json");
const prefix = config.prefix;

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const { cooldowns } = client;

//////////////////////HANDLER///////////////////////////////
//carrega os comandos
const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`../commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}
//pesquisa pelo comando
const commandFiles = fs
  .readdirSync("././commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`././commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", async(message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName) && !client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    ))
    return message.channel.send(
      `${message.author}, desculpe mas eu não tenho esse comando`
    );

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );
    
  let devs = await database.ref(`Devs/Usuarios/${message.author.id}`).once("value")

  if (command.devs && !devs.val()) {
    return message.reply(`Esse comando é restrito, é so pode ser usado pelos meus devs!`)
  }

  if (command.args && !args.length) {
      let embed5 = new Discord.MessageEmbed()
      .setTitle(`Erro de sintaxe:`)
      .setDescription(`**Para esse comando funcionar ele precisa de argumentos! \nO uso correto seria:** \`\`\`${prefix}${command.name} ${command.usage}\`\`\``)
      .setColor('#8A2BE2')
      .setFooter(`Autor: ${message.author.username}`)
      .setTimestamp()
      
    return message.channel.send(embed5);
  }

  if (command.guildOnly && message.channel.type === "dm") return;
  
           ////////////////////Cooldowns///////////////

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	  if (now < expirationTime) {
		  const timeLeft = (expirationTime - now) / 1000;
		  return message.reply(`Espere ${timeLeft.toFixed(1)} segundos para ultilizar esse comando novamente.`);
	  }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  
  try {
    command.execute(client, message, args);
  } catch (error) {
    console.error(error);
    message.reply("o comando estar com erros!");
  }
});
///////////////////////////////////FIM DA HANDLER////////////////////////////////////

///////////////////////////////////XP E LEVEL////////////////////////////////////////
client.on("message", message => {
  if (message.channel.type == "DM") return;
  if (message.author.bot) return;
  
  let user = message.author.tag
  
  database.ref(`Xp/Usuarios/${message.author.id}`)
  .once("value").then(async function(db) {
    if (db.val() == null) {
      database.ref(`Xp/Usuarios/${message.author.id}`)
      .set ({
        xp: 0,
        level: 1,
        limite: 100,
        name: user
      })
    } else {
        let geraXP = Math.floor(Math.random() * 10) + 1;
        let geralimite = Math.floor(Math.random() * 550) + 250;
        
      if (db.val().limite <= db.val().xp) {
        database.ref(`Xp/Usuarios/${message.author.id}`)
        .update ({
          xp: db.val().xp + geraXP,
          level: db.val().level + 1,
          limite: db.val().limite + geralimite
       })
      message.channel.send(`parabens ${message.author} vc passou para o nivel ${db.val().level+1}`)
      } else {
        database.ref(`Xp/Usuarios/${message.author.id}`)
        .update ({
          xp: db.val().xp + geraXP,
          name: user
        })
      }
    }
  })
})
//////////////////////////////////FIM DO XP E LEVEL///////////////////////////////////////

//////////////////////////////////COMANDO DE MENÇÃO///////////////////////////////////////
client.on("message", message => {
    let embed90 = new Discord.MessageEmbed()
    .setDescription(`olá ${message.author}, o meu prefixo é ${config.prefix}, para saber mas sobre os meus comandos ultilize ${config.prefix}comandos`)
    .setColor('#8A2BE2')
    
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return;
    if(message.content == '<@822903328995803177>' || message.content == '<@!822903328995803177>') {
        return message.channel.send(embed90)
    }
});
//////////////////////////////////FIM DO COMANDO DE MENÇÃO////////////////////////////////
