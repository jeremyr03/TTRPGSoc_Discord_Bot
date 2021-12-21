// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token, prefix } = require('../auth.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    console.log(message.content);
    if (message.content === `${prefix}ping`) {
        message.channel.send('Pong');
    }else if (message.content === `${prefix}server`){
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    }else if (message.content === `${prefix}hello`){
        message.channel.send(`Hello ${message.author.username}! I am a bot for the UoM TTRPG Soc.`);
    }
});


// Login to Discord with your client's token
client.login(token);
