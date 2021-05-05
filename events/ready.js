const Discord = require("discord.js");
const client = require("../index.js");
const config = require("../config.json");

client.on("ready", () => {
    let status = [
        {name: `Utilize ${config.prefix}help para obter ajuda`, type: "PLAYING"},
        {name: `estamos em mas de ${client.guilds.cache.size} servidores!`, type: "STREAMING"},
        {name: `vcs sabiam que eu sou open soucer📂??`, type: "STREAMING"},
        {name: `💕sempre sigam os seus sonhos pois eles são valiosos💕`, type: "LISTENING"},
        {name: `vamos tomar um café mas vc que paga viu?`, type: "LISTENING"},
        {name: `a minha documentação estar sendo feita para que todas as comunidades possa ver os meus códigos😶`, type: "STREAMING"},
        {name: `tenha fé em deus é vc vc conguir tudo que guer`, type: "WATCHING"}
    ]
    function setStatus() {
        let statusale = status[Math.floor(Math.random() * status.length)]
        let nam = statusale.name;
        let typ = statusale.type;
        client.user.setActivity({name: `${nam}`, type: `${typ}`})
    }
    setStatus();
    setInterval(() => setStatus(), 120000)
    client.user
        .setStatus("dnd")
        .catch(console.error);
})