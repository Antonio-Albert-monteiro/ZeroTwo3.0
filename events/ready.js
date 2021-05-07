const Discord = require("discord.js");
const client = require("../index.js");
const config = require("../config.json");

///////////////////////////////////TROCA DE STATUS///////////////////////////
client.on("ready", () => {
    let status = [
        {name: `Utilize ${config.prefix}help para obter ajuda`, type: "PLAYING"},
        {name: `estamos em mas de ${client.guilds.cache.size} servidores!`, type: "STREAMING"},
        {name: `💕sempre sigam os seus sonhos pois eles são valiosos💕`, type: "LISTENING"},
        {name: `vamos tomar um café mas vc que paga viu?`, type: "LISTENING"},
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
/////////////////////////////////FIM DA TROCA DE STATUS////////////////////////

//////////////////////////////////TROCA DE AVATAR//////////////////////////////
client.on('ready', () => {
    const avatar = [
        'https://imgur.com/DWBTVqz.jpeg',
        'https://imgur.com/zapMrJg.jpeg',
        'https://imgur.com/i6MwVkt.jpeg',
        'https://imgur.com/FdTfUx3.jpeg',
        'https://imgur.com/mrdClVW.jpeg',
        'https://imgur.com/ZLSgTTy.jpeg',
        'https://imgur.com/hbwEIth.jpeg'
    ]
    let funimagem = null;
    function oi2() {
        funimagem = setInterval(setimage, 420000)
    }
    function setimage() {
        let image = avatar[Math.floor(Math.random() * avatar.length)]
        client.user.setAvatar(image)
    }
    oi2();
})
//////////////////////////////////FIM DA TROCA DE AVATAR//////////////////////