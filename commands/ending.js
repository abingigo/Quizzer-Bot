const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

module.exports = {
    name : 'ending',
    description : '',
    async execute(message, Discord, client){
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("Leaderboard");
          var mysort = { points: 1 };
          dbo.collection("Points").find().sort(mysort).toArray(function(err, result) {
            if (err) throw err;
            var j = 1;
            var a = '1. <@' + `${result[0].id}` +'>';
            for(var i = 1; i < result.length;)
            {
              while(result[j].points == result[j-1].points)
              {
                a += '\n   <@' + `${result[j].id}` +'>';
                j = j + 1;
              }
              i = i + 1;
              if(i == result.length)
                break;
              a += '\n' + `${i}` +'. <@' + `${result[j].id}` +'>';
            }
            let embed = new Discord.MessageEmbed()
              .setColor('#e42643')
              .setTitle('Quiz Results')
              .setDescription('1. <@' + `${result[0].id}` +'>');
            console.log(result);
            var channellog = message.client.channels.cache.get('');
            channellog.send(embed);
            db.close();
          });
        });
    } 
}