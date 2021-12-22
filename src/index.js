// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token, prefix, mysql} = require('./auth.json');
const {createConnection} = require('mysql2');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Prepare the mysql connection
let con = createConnection(mysql);

// Then we are going to connect to our MySQL database, and we will test this on errors
con.connect(err => {
    // Console log if there is an error
    if (err) return console.log(err);

    // No error found?
    console.log(`MySQL has been connected!`);
});


// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log(`${client.user.tag} is ready!`);
});

client.on('message', message => {
    // console.log(message.content);
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let args = message.content.slice(prefix.length).trim().split('\n');
    let command = args.shift().toLowerCase();
    console.log(command);
    switch (command) {


        case 'ping':
            message.channel.send('Pong');
            return;


        case 'help':
            message.channel.send(`This is a bot aimed at making it easier to create and organise DnD sessions for the University of Manchester.`);
            message.channel.send(`**to create a party**\n > ${prefix}create party\n> <Party Description>\n> <session timing>\n> <party size (make sure this is a number)>` +
                `\n\n-------------------------`);
            message.channel.send(`**to view a party**\n \> ${prefix}view <dm|member>\n\n-------------------------`);
            message.channel.send(`**to delete a party**\n \> ${prefix}delete party <partyID>` +
                `\n\n-------------------------`);
            return;


        case 'create party':
            if (args.length === 3) {
                let author = message.author.username;
                console.log(author);
                let description = args.shift();
                let timing = args.shift();
                let size = args.shift();
                con.query(`INSERT INTO \`t11915jr\`.party(dungeonMaster, sessionDescription, partySize, sessionTime) VALUES ('${author}', '${description}', ${size}, '${timing}');`, (err, row) => {
                    // Return if there is an error
                    if (err) return console.log(err);

                    message.channel.send(`\`\`\`Party created! type ${prefix}view party to see a list of all parties.\`\`\``);
                });
                console.log('t');
            } else {
                message.channel.send('\`To create a party, you need to add the arguments in the format in one message:\`\n\n' +
                    `\> ${prefix}${command}\n\> <Party Description>\n\> <session timing>\n\> \<party size (make sure this is a number)>`);
            }
            return;


    }

    args = message.content.slice(prefix.length).trim().split(' ');

    console.log(command);

    switch (command) {


        case 'view':
            command = args.shift().toLowerCase();
            switch (command){

                case 'dm':
                    con.query(`SELECT * FROM party WHERE dungeonMaster = '${message.author.username}';`, (err, row, field) => {
                        // Return if there is an error
                        if (err) return console.log(err);
                        if (!row.length){
                            message.channel.send(`\> You currently have no parties that you are DM'ing.`)
                        }
                        for (let i = 0; i < row.length; i++) {
                            if (i !== 0){
                                message.channel.send('-------------------------\n');
                            }
                            message.channel.send(`\> PartyID: ${row[i]['partyID']}\n` +
                                `\> Session Time: ${row[i]['sessionTime']}\n` +
                                `\> Description: ${row[i]['sessionDescription']}\n` +
                                `\> Party Size: ${row[i]['numOfMembers']} / ${row[i]['partySize']}`);
                        }
                    });
                    return;

                case 'member':
                    con.query(`SELECT * FROM party INNER JOIN members ON party.partyID = members.partyID WHERE members.member = '${message.author.username}';`, (err, row, field) => {
                        // Return if there is an error
                        if (err) return console.log(err);
                        if (!row.length){
                            message.channel.send(`\> You currently have no parties that you are taking part in.`)
                        }
                        for (let i = 0; i < row.length; i++) {
                            if (i !== 0){
                                message.channel.send('-------------------------\n');
                            }
                            message.channel.send(`\> PartyID: ${row[i]['partyID']}\n` +
                                `\> Dungeon Master: ${row[i]['dungeonMaster']}\n` +
                                `\> Session Time: ${row[i]['sessionTime']}\n` +
                                `\> Description: ${row[i]['sessionDescription']}\n` +
                                `\> Party Size: ${row[i]['numOfMembers']} / ${row[i]['partySize']}`);
                        }
                    });
                    return;

                default:
                    message.channel.send(`Make sure you have the correct syntax.\n\n > view <dm|member>`);


            }


        case 'join':

    }
});


// Login to Discord with your client's token
client.login(token);
