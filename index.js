const Discord = require("discord.js");
const fs = require("fs");
const firebase = require("firebase");
const banco = require("./banco.js");
const ms = require("parse-ms");
const server = require("./server.js");
const client = new Discord.Client();

module.exports = client;
const message = require("./events/message.js");
const ready = require("./events/ready.js");
console.log(`eventos carregados`)

client.login(process.env.TOKEN);