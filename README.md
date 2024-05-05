# Discord Nuclear Warhead
A simple, efficient, and effective discord.js bot made to nuke servers with the most customizability and options possible.

## How to use
Node.js is required to use this. Download/clone the repository, and run `setup.bat`. Then, rename `config-example.json` to `config.json` and add your bot token as well as your own account's ID. The account ID is used to make sure only you can run these commands, and nobody can hijack your bot. You can disable this functionality by settings `"publicUse"` to `"true"` in the config. You can also alter the randomized messages that are used in the `spamnuke` command.

Once you have your config how you'd like it, run `start.bat`. This will show you the available commands, and will put your bot online. Of course, the hardest part is getting the bot into the server you want to nuke, but I can't help with that. Make sure that your bot has full Administrator permissions in the server you want to nuke. If your bot's role is at the top of the roles list, it's even better because it can delete more roles and ban more users.

## Commands
Your chosen prefix, which is by default `!`, will need to be input before the command when typing it into Discord.

`nuke` - delete all channels, roles, and emojis.

`spamnuke` - delete all channels, roles, and emojis, spam create roles+channels and spam ping @everyone.

`kickall` - kick all members from the server.

`banall` - ban all members from the server.

`delchannels` - delete all channels.

`delroles` - delete all roles.

`admin` - gives user stealthy admin role.

## Warnings
The bot will create up to 100 channels and 100 roles at a time when using the `spamnuke` command, and ping @everyone 30 times in each channel, for a total of 3000 pings. This is because doing any more than that will get your bot rate limited.

## Planned Features

Mass creation commands seperate from `spamnuke`
