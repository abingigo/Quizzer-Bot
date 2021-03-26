var MongoClient = require('mongodb').MongoClient;
const Discord = require('discord.js');
var url = "mongodb://127.0.0.1:27017/";

module.exports = {
    name : 'answering',
    description : '',
    async execute(message, args, ans){
        const emoji = '✅';
        const emoji1 = '❌';
        if(args[0].trim() == ans.trim())
        {
            message.channel.send("Correct Answer");
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("Leaderboard");
                var myquery = { id : message.author.id , answered : 0};
                var newvalues = { $set: { answered : 1}, $inc : {"points" : 10} };
                dbo.collection("Points").updateOne(myquery, newvalues, function(err, res) {
                  if (err) throw err;
                  db.close();
                });
              });
        }
        else
        {
            const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
            message.channel.send("Please wait while the quizmasters verify your answer");
            var a = args[0];
            for(var p = 1; p < args.length; p = p + 1)
            {
                a = a + ' ';
                a = a + args[p];
            }
            let embed = new Discord.MessageEmbed()
                .setColor('#e42643')
                .setTitle(a)
            var channellog = message.client.channels.cache.get(''); //removed channel id
            let messageEmbed = await channellog.send(embed);
            messageEmbed.react(emoji);
            messageEmbed.react(emoji1);
            client.on('messageReactionAdd', async (reaction, user) => {
                if(reaction.message.partial) await reaction.message.fetch();
                if(reaction.partial) await reaction.fetch();
                if(user.bot) return;
                if(reaction.count >= 3 && reaction.emoji.name == emoji)
                {
                    message.channel.send(`${args[0]}` + " is correct");
                    messageEmbed.delete();
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("Leaderboard");
                        var myquery = { id : message.author.id , answered : 0};
                        var newvalues = { $set: { answered : 1}, $inc : {"points" : 10} };
                        dbo.collection("Points").updateOne(myquery, newvalues, function(err, res) {
                          if (err) throw err;
                          db.close();
                        });
                      });
                      messageEmbed.delete();
                }
                if(reaction.count >= 3 && reaction.emoji.name == emoji1)
                {
                    message.channel.send(`${args[0]}` + " is wrong");
                    messageEmbed.delete();
                }
            });
            client.on('messageReactionRemove', async (reaction, user) => {
                if(reaction.message.partial) await reaction.message.fetch();
                if(reaction.partial) await reaction.fetch();
                if(user.bot) return;
            });
        }
    }
}
