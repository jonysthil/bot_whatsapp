const qrcode = require('qrcode-terminal');

const { Client, MessageMedia } = require('whatsapp-web.js');
const client = new Client();

const media = MessageMedia.fromFilePath('./img/bot.png');

client.on('qr', qr => {
    qrcode.generate(qr, { 
        small: true
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    console.log(message.body);
});

/* client.on('message', message => {
    if(message.body === 'Hello') {
        //message.reply('World');
        client.sendMessage(message.from, 'World');
        //client.sendMessage(media, {caption: 'Buenos días'});
	} else {
        client.sendMessage(message.from, "No tengo respuesta para eso!!");
    }
}); */

client.on('message', async (msg) => {
    
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    chat.sendMessage(contact);
    await chat.sendMessage(media, {caption: `Hello @${contact.id.user}`}, {
        mentions: [contact]
    });
    
    await chat.sendMessage(`Hello @${contact.id.user}`, {
        mentions: [contact]
    });

    /* if(message.body === 'Hello') {
        //message.reply('World');
        client.sendMessage(message.from, 'World');
        client.sendMessage(`${contact.pushname} was mentioned`);
        //client.sendMessage(media, {caption: 'Buenos días'});
	} else {
        client.sendMessage(message.from, "No tengo respuesta para eso!!");
    } */

});


client.initialize();