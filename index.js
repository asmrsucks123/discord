const Discord = require('discord.js')
const bot = new Discord.Client();

const token = not for uuuuu

var servers = {};

const ytdl = require('ytdl-core');

const PREFIX = '.';

//the version, is below, you can edit this all you want.
var version = 'The current verson is 1.0.1 (created by <@533749318491045948> )';

//BELOW is the info embed (when you do .info ALONE without anything else.)

const infoembed = new Discord.RichEmbed()
    .setTitle('Info Args Help')
    .addField('**Info Args**', 'Chances are if you got here, you forgot to put in an argument after .info! The arguments you can use are shown below.')
    .addField('~~~', '**version** this will show the current version of me, the bot!') 
    .setColor(0x09CABD)
    .addField('~~~', '**user** This will display information about you.')
bot.on('ready', () =>{
    console.log('This bot is online!');
})
//below are commands that are used.
bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");    

    switch(args[0]){
        case 'troll':
            message.channel.sendMessage('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        break;
        case 'info':
            if(args[1] === 'user'){
                message.channel.sendMessage(version)
                const userembed = new Discord.RichEmbed()
                .addField('User Name', message.author.username)
                .setTitle('Your Information :D')
                .setColor(0x09CABD)
                .addField('Current Server', message.guild.name)
                .setThumbnail(message.author.avatarURL)
                message.channel.sendEmbed(userembed)
            
            }else{//below sends the embed found above, under info embed. The above sends the current version, also found above.
                message.channel.sendMessage(infoembed)
            }
            break;
        case 'clear':
            if(!args[1]) return message.reply('Error, please define the amount of messages to delete!')
            message.channel.bulkDelete(args[1]);
            break;
        case 'help':
            const helpembed = new Discord.RichEmbed()
            .addField('I see you have landed on the help page.', 'Below is a list of all commands that you will ever need.')
            .setTitle('Help Page')
            .setColor(0xE664CC)
            .addField('.info', 'Shows the list of commands under the "info" category.')
            .addField('.troll', 'Try it, I dare you :wink:')
            .addField('.clear', 'Clear will act as a purge, simply .clear <amount> to delete the amount of messages you wish')
            .setAuthor(' adrien#1234 ')
            message.channel.sendEmbed(helpembed)
            break;
        case 'play':
            
            function play(connection, message){
                var server = servers[message.guild.id];
                server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }else {
                        connection.disconnect();
                    }
                });
            }
            
            if(!args[1]){
                message.channel.send("In order to play a song, please provide a link!");
                return;
            }
            
            if(!message.member.voiceChannel){
                message.channel.send('In order to songs, be in a voice channel!');
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
            
            var server = servers[message.guild.id];

            server.queue.push(args[1]);
            
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                play(connection, message);
            })
        break;

        case 'skip':
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
            message.channel.send('Skipping the song!')

        break;

        case 'stop':
            var server = servers[message.guild.id];
            if(message.guild.voiceConnection){
                for(var i = server.queue.length -1; 1 >=0; i--){
                    server.queue.splice(i, 1);
                }
                server.dispatcher.end();
                message.channel.send('Ending the queue, leaving the voice channel!')
                console.log('stopped the queue')
            }
            if(message.guild.connection) message.guild.voiceConnection.disconnect();
        break;

    }
})



bot.login(token);
