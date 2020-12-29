const Discord = require('discord.js');


const client = new Discord.Client();

const prefix = '$';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('QuizzerBot is online')
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    var no;
    
    if(command === 'a')
    {
        fs.readFile('Questions.txt', (err, data) => {
            if(err) throw err;
            var s = data.toString().split('\n');
            console.log(no);
            for(i = 0; i < s.length; i++)
            {
                if(s[i].localeCompare(no))
                {
                    var ans = s[i+2];
                    break;
                }
            }
            if(ans.localeCompare(args[0]))
                console.log("Correct Answer");
            else
                console.log("Wrong Answer");
        });
    }

    if(command === 'q' && message.member.roles.cache.has('')) // **
    {
        fs.readFile('Questions.txt', (err, data) => {
            if(err) throw err;
            var s = data.toString().split('\n');
            no = args[0];
            for(i = 0; i < s.length; i++)
            {
                if(s[i].localeCompare(args[0]))
                {
                    var qn = s[i+1];
                    var img = s[i+3];
                    break;
                }
            }
            client.commands.get('question').execute(message, args, qn, img, Discord);
        });
    }
});

client.login('');// **