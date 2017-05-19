"use strict";

let nforce = require('nforce');

let org = nforce.createConnection({
    clientId: '3MVG9OI03ecbG2VpTaC8qC9NGOUblnMuYGkjoSJCVc0uGmAHLoYlDAyvACKRdzbnqP9T0k1W6IOJWg8eczzv8',
    clientSecret: '8851574018492994740',
    redirectUri: 'http://localhost:3000/oauth/_callback',
    environment: 'sandbox',
    mode: 'single',
    autoRefresh: true
});

let login = () => {

    org.authenticate({
        username: 'integration_user@intuit.com',
        password: 'Jagzram01LfJKGhoBrwE6SitHSYvuLV4e'
    }, err => {
        if (err) {
            console.error("Authentication error");
            console.error(err);
        } else {
            console.log('Cached Token: ' + org.oauth.access_token);
            console.log("Authentication successful");
        }
    });

};

let _callback = function () {
    console.log("Authentication successful");
};

let findAccount = name => {

    return new Promise((resolve, reject) => {
        let q = "SELECT Id, Name, Phone, BillingStreet, BillingCity, BillingState FROM Account WHERE Name LIKE '%" + name + "%' LIMIT 5";
        org.query({
            query: q
        }, (err, resp) => {
            if (err) {
                console.log(err);
                reject("An error as occurred");
            } else {
                resolve(resp.records);
            }
        });
    });

};

let findContact = name => {

    return new Promise((resolve, reject) => {
        let q = "SELECT Id, Name, Phone, MobilePhone, Email FROM Contact WHERE Name LIKE '%" + name + "%' LIMIT 5";
        org.query({
            query: q
        }, (err, resp) => {
            if (err) {
                reject("An error as occurred");
            } else {
                resolve(resp.records);
            }
        });
    });

};

let findOpportunity = name => {

    return new Promise((resolve, reject) => {
        let q = "SELECT Id, Name, Amount, Probability, StageName, CloseDate FROM Opportunity WHERE Name LIKE '%" + name + "%' ORDER BY amount DESC LIMIT 5";
        org.query({
            query: q
        }, (err, resp) => {
            if (err) {
                reject("An error as occurred");
            } else {
                resolve(resp.records);
            }
        });
    });

};

let getTopOpportunities = count => {

    count = count || 5;

    return new Promise((resolve, reject) => {
        var q = "SELECT Id, Name, Amount, Probability, StageName, CloseDate FROM Opportunity WHERE isClosed=false ORDER BY amount DESC LIMIT " + count;
        org.query({
            query: q
        }, (err, resp) => {
            if (err) {
                console.error(err);
                reject("An error as occurred");
            } else {
                resolve(resp.records);
            }
        });
    });

};

let createContact = contact => {

    return new Promise((resolve, reject) => {
        let c = nforce.createSObject('Contact');
        c.set('firstName', contact.firstName);
        c.set('lastName', contact.lastName);
        c.set('title', contact.title);
        c.set('phone', contact.phone);
        org.insert({
            sobject: c
        }, (err, resp) => {
            if (err) {
                console.error(err);
                reject("An error occurred while creating a contact");
            } else {
                resolve(c);
            }
        });
    });

};

let createCase = newCase => {

    return new Promise((resolve, reject) => {
        let c = nforce.createSObject('Case');
        c.set('subject', newCase.subject);
        c.set('description', newCase.description);
        c.set('origin', 'Slack');
        c.set('status', 'New');

        org.insert({
            sobject: c
        }, err => {
            if (err) {
                console.error(err);
                reject("An error occurred while creating a case");
            } else {
                resolve(c);
            }
        });
    });

};

let createReq = newReq => {

    return new Promise((resolve, reject) => {
        let c = nforce.createSObject('tobase__Requisition__c');
        c.set('RecordType.Name', 'Hiring Req');
        c.set('origin', 'Slack');
        c.set('status', 'New');

        org.insert({
            sobject: c
        }, err => {
            if (err) {
                console.error(err);
                reject("An error occurred while creating a case");
            } else {
                resolve(c);
            }
        });
    });

};

let getHiringManager = hmEmail => {

    return new Promise((resolve, reject) => {
        let q = "SELECT Id, Name, Email FROM Contact WHERE Email LIKE '%" + hmEmail + "%' LIMIT 1";
        org.query({
            query: q
        }, (err, resp) => {
            if (err) {
                reject("An error as occurred");
            } else {
                resolve(resp.records);
            }
        });
    });

};

login();

exports.org = org;
exports.findAccount = findAccount;
exports.findContact = findContact;
exports.findOpportunity = findOpportunity;
exports.getTopOpportunities = getTopOpportunities;
exports.createContact = createContact;
exports.createCase = createCase;
exports.createReq = createReq;
exports.getHiringManager = getHiringManager;