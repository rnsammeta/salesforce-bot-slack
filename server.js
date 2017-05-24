"use strict";

let http = require('http');

const SLACK_BOT_TOKEN = 'xoxb-185110106320-29OMpRo2J7Pm4SQZx3fHxtwO';

let Botkit = require('botkit'),
    formatter = require('./modules/slack-formatter'),
    salesforce = require('./modules/salesforce'),

    controller = Botkit.slackbot(),

    bot = controller.spawn({
        token: SLACK_BOT_TOKEN
    });

bot.startRTM(err => {
    if (err) {
        throw new Error('Could not connect to Slack');
    }
});


controller.hears(['help'], 'direct_message,direct_mention,mention', (bot, message) => {
    bot.reply(message, {
        text: `You can ask me things like:
    "Search account Acme" or "Search Acme in acccounts"
    "Search contact Lisa Smith" or "Search Lisa Smith in contacts"
    "Search opportunity Big Deal"
    "Create contact"
    "Create case"`
    });
});


controller.hears(['search account (.*)', 'search (.*) in accounts'], 'direct_message,direct_mention,mention', (bot, message) => {
    let name = message.match[1];
    salesforce.findAccount(name)
        .then(accounts => bot.reply(message, {
            text: "I found these accounts matching  '" + name + "':",
            attachments: formatter.formatAccounts(accounts)
        }))
        .catch(error => bot.reply(message, error));
});

controller.hears(['search contact (.*)', 'find contact (.*)'], 'direct_message,direct_mention,mention', (bot, message) => {
    let name = message.match[1];
    salesforce.findContact(name)
        .then(contacts => bot.reply(message, {
            text: "I found these contacts matching  '" + name + "':",
            attachments: formatter.formatContacts(contacts)
        }))
        .catch(error => bot.reply(message, error));
});

controller.hears(['top (.*) deals', 'top (.*) opportunities'], 'direct_message,direct_mention,mention', (bot, message) => {
    let count = message.match[1];
    salesforce.getTopOpportunities(count)
        .then(opportunities => bot.reply(message, {
            text: "Here are your top " + count + " opportunities:",
            attachments: formatter.formatOpportunities(opportunities)
        }))
        .catch(error => bot.reply(message, error));
});

controller.hears(['search opportunity (.*)', 'find opportunity (.*)'], 'direct_message,direct_mention,mention', (bot, message) => {

    let name = message.match[1];
    salesforce.findOpportunity(name)
        .then(opportunities => bot.reply(message, {
            text: "I found these opportunities matching  '" + name + "':",
            attachments: formatter.formatOpportunities(opportunities)
        }))
        .catch(error => bot.reply(message, error));

});

controller.hears(['create case', 'new case'], 'direct_message,direct_mention,mention', (bot, message) => {

    let subject,
        description;

    let askSubject = (response, convo) => {

        convo.ask("What's the subject?", (response, convo) => {
            subject = response.text;
            askDescription(response, convo);
            convo.next();
        });

    };

    let askDescription = (response, convo) => {

        convo.ask('Enter a description for the case', (response, convo) => {
            description = response.text;
            salesforce.createCase({
                    subject: subject,
                    description: description
                })
                .then(_case => {
                    bot.reply(message, {
                        text: "I created the case:",
                        attachments: formatter.formatCase(_case)
                    });
                    convo.next();
                })
                .catch(error => {
                    bot.reply(message, error);
                    convo.next();
                });
        });

    };

    bot.reply(message, "OK, I can help you with that!");
    bot.startConversation(message, askSubject);

});

controller.hears(['create contact', 'new contact'], 'direct_message,direct_mention,mention', (bot, message) => {

    let firstName,
        lastName,
        title,
        phone;

    let askFirstName = (response, convo) => {

        convo.ask("What's the first name?", (response, convo) => {
            firstName = response.text;
            askLastName(response, convo);
            convo.next();
        });

    };

    let askLastName = (response, convo) => {

        convo.ask("What's the last name?", (response, convo) => {
            lastName = response.text;
            askTitle(response, convo);
            convo.next();
        });

    };

    let askTitle = (response, convo) => {

        convo.ask("What's the title?", (response, convo) => {
            title = response.text;
            askPhone(response, convo);
            convo.next();
        });

    };

    let askPhone = (response, convo) => {

        convo.ask("What's the phone number?", (response, convo) => {
            phone = response.text;
            salesforce.createContact({
                    firstName: firstName,
                    lastName: lastName,
                    title: title,
                    phone: phone
                })
                .then(contact => {
                    bot.reply(message, {
                        text: "I created the contact:",
                        attachments: formatter.formatContact(contact)
                    });
                    convo.next();
                })
                .catch(error => {
                    bot.reply(message, error);
                    convo.next();
                });
        });

    };

    bot.reply(message, "OK, I can help you with that!");
    bot.startConversation(message, askFirstName);

});


controller.hears(['search hm', 'hiring manager', 'hm'], 'direct_message,direct_mention,mention', (bot, message) => {
    let hmEmail;

    let askHMEmail = (response, convo) => {

        convo.ask("What's the hiring manager name?", (response, convo) => {
            hmEmail = response.text;
            salesforce.getHiringManager(hmEmail)
                .then(hiringManagers => {
                    bot.reply(message, {
                        text: "Here's the hiring manager details: ",
                        attachments: formatter.formatHiringManager(hiringManagers)
                    });
                    convo.next();
                })
                .catch(error => {
                    bot.reply(message, error);
                    convo.next();
                });
        });

    };

    bot.startConversation(message, askHMEmail);
});


controller.hears(['create req', 'new req', 'req'], 'direct_message,direct_mention,mention', (bot, message) => {

    let hmName,
        title,
        location,
        justification;

    let askHmName = (response, convo) => {

        convo.ask("What's the hiring manager name?", (response, convo) => {
            hmName = response.text;
            askTitle(response, convo);
            convo.next();
        });

    };

    let askTitle = (response, convo) => {

        convo.ask("What's the Title?", (response, convo) => {
            title = response.text;
            askLocation(response, convo);
            convo.next();
        });

    };

    let askLocation = (response, convo) => {

        convo.ask("What's the primary location?", (response, convo) => {
            location = response.text;
            askJustification(response, convo);
            convo.next();
        });

    };

    let askJustification = (response, convo) => {

        convo.ask("Please provide justification?", (response, convo) => {
            justification = response.text;
            salesforce.createReq({
                    hmName: hmName,
                    title: title,
                    location: location,
                    justification: justification
                })
                .then(req => {
                    bot.reply(message, {
                        text: "I created an awesome req: ",
                        attachments: formatter.formatRequisition(req)
                    });
                    convo.next();
                })
                .catch(error => {
                    bot.reply(message, error);
                    convo.next();
                });
        });

    };

    bot.startConversation(message, askHmName);
});


// To keep Heroku awake
http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.end('Ok, dyno is awake.');
}).listen(process.env.PORT || 3000);