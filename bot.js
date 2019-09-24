var Discord = require('discord.js');
var fs = require('fs');
var auth = require('./auth.json');
var bot = new Discord.Client();


bot.login(auth.token);

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    deleteMessagesFromASpecificPerson(msg, '', callback => {
        if (callback)
            return;
        else {
            if (msg.content.substring(0, 1) == '&') {
                var command = msg.content.toLocaleLowerCase().substring(1).split(" ");

                if (command.length > 1) {
                    //commands with parameters
                    if (command[0] == 'blacklist' && (command[1] != '' || command[1] != null)) {

                    }

                    return;
                }
                else {
                    //commands without parameters
                    switch (command[0]) {
                        case 'ping':
                            msg.reply('Pong!');
                            break;

                        case 'server':
                            minecraftServer(msg, 619233693353115671, (30 * 1000)); //30 seconds
                            break;

                        case 'myavatar':
                            myAvatar(msg);
                            break;

                        case 'perfection':
                            perfection(msg)
                            break;

                        case 'join':
                            flamingoMusic(msg);
                            break;

                        case 'leave':
                            flamingoStop(msg);
                            break;

                        case 'owo':
                            owo(msg);
                            break;

                        default:
                            msg.reply('Comando inválido, tente usar o \"&help\".');

                    }
                    // return;
                }
            }
        }
    });
});

function minecraftServer(msg, channelId, secondsTimeout) {
    if (msg.channel.id == channelId) {
        msg.reply('**Servidor:** *toucanmc.mcph.co*')
            .then(reply => {
                reply.delete(secondsTimeout);
            })
            .catch(error => {
                console.log('Erro', error);
            })
        msg.delete();
    }
}

function myAvatar(msg) {
    msg.reply(msg.author.avatarURL);
}

function deleteMessagesFromASpecificPerson(msg, userId, callback) {
    if (msg.author.id == userId) { //command to delete messages from a specific person
        msg.delete();
        return callback(1);
    }
    else
        return callback(0);
}

function perfection(msg) {
    msg.reply('Mary Elizabeth Winstead');
}

function flamingoMusic(msg) {
    if (msg.member.voiceChannel.joinable == true) {
        msg.member.voiceChannel.join()
            .then(connection => {
                var dispatcher = connection.playFile('resources/audios/flamingo.mp3');
                dispatcher.on('end', end => {
                    msg.member.voiceChannel.leave();
                });
            })
            .catch(console.error);
    }
}

function flamingoStop(msg) {
    msg.member.voiceChannel.leave();
}

function owo(msg) {
    msg.reply('owo');
}