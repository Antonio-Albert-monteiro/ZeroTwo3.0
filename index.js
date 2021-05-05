const Discord = require("discord.js");
const fs = require("fs");
const firebase = require("firebase");
const ms = require("parse-ms");
const config = require("./config.json");
const banco = require("./banco.js");
const server = require("./server.js");
const client = new Discord.Client();
const database = firebase.database();
const prefix = config.prefix;

module.exports = client;
const message = require("./events/message.js");
const ready = require("./events/ready.js")


client.login(process.env.TOKEN);