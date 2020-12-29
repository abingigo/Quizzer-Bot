module.exports = {
    name: 'question',
    description : "",
    execute(message, args, qn, img, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#66bbff')
        .setTitle('Question ' + args[0])
        .setDescription(qn)
        .setImage(img)
        .setFooter('Prefix your answers with $a.\nFor example if the answer is Delhi type $a Delhi')

        message.channel.send(newEmbed);
    }
}