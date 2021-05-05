const Discord = require("discord.js");
const fs = require('fs');
const firebase = require("firebase");
const ms = require("parse-ms");
const config = require("./config.json");
const banco = require("./banco.js");
const server = require("./server.js");
const client = new Discord.Client();
const database = firebase.database();
const prefix = config.prefix;

//handler
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//fimhandle

///////////////////////////HANDLER///////////////////////////////////
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
		console.log(`Comando ${command.name}, carregado`)
	}
}

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     
     const args = message.content.trim().slice(config.prefix.length).split(/ +/g);
     const commandName = args.shift().toLowerCase();
     const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
     
     if (!command) return;ommand = client.commands.get(commandName);
     
     if (command.args && !args[0]) {
         let embed0 = new Discord.MessageEmbed()
         .setTitle(`Erro de Sintaxe:`)
         .setDescription(`***Você não forneceu nenhum argumento!***\nO uso correto seria: \`${prefix}${command.name} ${command.usage}\``)
         .setColor(`#FF0000`)
         .setFooter(`Executado por: ${message.author.username}`)
         .setTimestamp()

        message.channel.send(embed0)
     } else {
        try {
            command.execute(client, message, args, banco, database);
        } catch (error) {
	          console.error(error);
	          message.channel.send(`${message.author}, esse comando não existe, tente verificar a sua ortografia.`);
        }
     }
});
//////////////////////////FIM DA HANDLER/////////////////////////////////


//status
client.on('ready', () => {
  const status = [
      {name: `Ajudando o server principal`, type: "PLAYING"},
      {name: `sei la2`, type: "WATCHING"},
      {name: `sei la3`, type: "LISTENING"},
      {name: `sei la4`, type: "STREAMING"},
      {name: `sei la5`, type: "STREAMING"}
  ]
  let oi = null;
  function read() {
    oi = setInterval(aleStatus, 120000)
  }
  
  function aleStatus() {
      let startale = status[Math.floor(Math.random() * status.length)]
      let name = startale.name;
      let type = startale.type;
      
      client.user.setActivity({name: `${name}`, type: `${type}`}).catch(console.error);
  }
  read();
  client.user
  .setStatus("dnd")
  .catch(console.error);
})

client.on("message", message => {
  if (message.channel.type == "DM") return;
  if (message.author.bot) return;
  
  database.ref(`Xp/${message.author.id}`)
  .once("value").then(async function(db) {
    if (db.val() == null) {
      database.ref(`Xp/${message.author.id}`)
      .set ({
        xp: 0,
        level: 1,
        limite: 100
      })
    } else {
        let geraXP = Math.floor(Math.random() * 10) + 1;
        let geralimite = Math.floor(Math.random() * 550) + 250;
        
      if (db.val().limite <= db.val().xp) {
        database.ref(`Xp/${message.author.id}`)
        .update ({
          xp: db.val().xp + geraXP,
          level: db.val().level + 1,
          limite: db.val().limite + geralimite
       })
      message.channel.send(`parabens ${message.author} vc passou para o nivel ${db.val().level+1}`)
      } else {
        database.ref(`Xp/${message.author.id}`)
        .update ({
          xp: db.val().xp + geraXP
        })
      }
    }
  })
})


//ready
client.on('ready', () => {
  console.log("estou on")
})

//login
client.login(process.env.TOKEN)