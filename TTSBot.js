// Packages
var Discord = require('discord.js');
const permission = Discord.Permissions.FLAGS;
var auth = require('./auth.json');


// Constants
const DEBUG = false;
const Messages = {
    DupeLeave: {
        verbs: ["leave", "remove"],
        message: "You have already disconnected from that frequency range.",
    },
    DupeRole: {
        verbs: [],
        message: "My sensors indicate that you have already performed this upgrade.",
    },
    RoleNotFound: {
        verbs: [],
        ", I am sorry. My sensors have failed to detect this role.",
    },
    Joined: {
        verbs: ["join", "add", "give"],
        ", you can now access these logs. If the Operator wishes to leave it at any time, simply tell me",
    },
    Left: {
        verbs: ["leave", "remove"],
        ", you have left the channel. You can rejoin at any time with",
    },
    Help: {
        verbs: ["help", "assistance"],
        "Ordis is here to assist the Operator, *or rather,* the *Operators*. "
            + "Here is a list of the ways I can help!\n"
            + " **1.** `Help me` will get my attention so I may ***ExPLAin these SImplE ComANds agAIN***.\n"
            + " **2.** ask for the `SecondDream`, `Sacrifice`, or `Chimera` roles if you wish to view the corresponding spoiler channels.\n"
            + " **3.** ask for the `Voice Chat` role to upgrade your Orbiter's radio to allow Text-To-Speech communication.\n"
            + " **4.** ask to leave one of the above roles and I will remove your access to the corresponding channel.\n",
    },
};

// Variables
var bot = new Discord.Client();


bot.on('ready', function (evt) {
    console.log('Connected');
    console.log('Logged in as Cephalon Ordis');
});


// SPlit text into words and loop to find verb / noun combinations
function parseText(message) {
    var words = message.split(' ');
    var verb, noun, obj;
    
    for (var i = 0; i < words.length; i++) {
        if (!verb) {
            if (words[i] === "need") {
                // look for nouns like "role" or phrases like "join channel"
            } else if (words[i] === "join" || words[i] === "add" || words[i] === "give") {
                verb = "join"
            } else {
                console.log("Unused word: ", words[i]);
            }
        } else {
            
        }
    }
}


// Discord chat interface
bot.on('message', async msg => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    var message = msg.content.toLowerCase();
    if (msg.author.username === "Cephalon Ordis" || message.indexOf("@cephalon ordis") <= 0) {
        if (DEBUG) console.log(msg.content);
        return false;
    }
    
    // Initialize any needed 
    var channelID = msg.channel.id;
    var user = msg.author.username;
    var userID = msg.author.id;
    if (DEBUG) console.log(user, userID);
    
    var args = message.substring(1).split(' ');
    var cmd = args[0];
    if (DEBUG) console.log(args);
    args = args.splice(1);
    
    if (cmd === "voicechat") {
        role = msg.guild.roles.find(role => role.name === "Voice Chat").id;
        
        msg.member.addRole(role).catch(console.error);
        
        msg.channel.send(
            user + Messages["Joined"].message + " `!leave voicechat`."
        );
    } else if (cmd === "completed") {
        if (!args[0]) return false;
        rName = msg.content.substring(1).slice(message.indexOf(' '), message.length);
        role = msg.guild.roles.find(role => role.name === rName);
        
        if (role && role.members.has(msg.member.id) ) {
            msg.channel.send(
                Messages["DupeRole"].message
            );
        } else if (role) {
            msg.member.addRole(role).catch(console.error);
            
            msg.channel.send(
                user + Messages["Joined"].message + " `!leave ` plus the role name."
            );
        } else {
            console.log(args, rName);
            msg.channel.send(
                user + Messages["RoleNotFound"].message
            );
        }
    } else if (cmd === "leave") {
        if (!args[0]) return false;
        rName = msg.content.substring(1).slice(message.indexOf(' '), message.length);
        role = msg.guild.roles.find(role => role.name === rName);
        
        if (role && !role.members.has(msg.member.id) ) {
            msg.channel.send(
                Messages["DupeLeave"].message
            );
        } else if (role) {
            msg.member.removeRole(role).catch(console.error);
            
            msg.channel.send(
                user + Messages["Left"].message + " the appropriate join command."
            );
        } else {
            console.log(args, rName);
            msg.channel.send(
                user + Messages["RoleNotFound"].message
            );
        }
    } else if (cmd === "channel" && userID == 266244018948669441) {
        msg.channel.send(
            String(channelID)+" : "+String(msg.channel.parent.id)
        );
    } else {
        console.log(cmd);
        msg.channel.send(
            Messages["Help"].message
        );
    }
});


bot.login(auth.token);