// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token, prefix} = require('./auth.json');
const sqlite = require('sqlite3').verbose();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    // console.log(message.content);
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split('\n');
    const command = args.shift().toLowerCase();
    console.log(command);
    if (command === `ping`) {
        message.channel.send('Pong');
    }else if (command === 'create party'){
        console.log(args.length)
        if (args.length === 3){
            console.log('t');
        }else {
            message.channel.send('\*To create a party, you need to add the arguments in the format in one message:\*\n\n' +
                `\> ${prefix}${command}\n\> <Party Description>\n\> <session timing>\n\> \<party size (make sure this is a number)>`);
        }
    }
});


// Login to Discord with your client's token
client.login(token);
