module.exports = {
	name: 'ping',
	aliases: ['ws', 'statusping'],
	args: true,
	usage: '<user>',
	cooldown: 5,
	devs: true,
	execute(client, message) {
	    message.channel.send(`oi`)
	}
};