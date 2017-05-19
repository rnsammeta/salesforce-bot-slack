"use strict";

let color = "#009cdb";

let formatAccounts = accounts => {

    if (accounts && accounts.length > 0) {
        let attachments = [];
        accounts.forEach(account => {
            let fields = [];
            fields.push({
                title: "Name",
                value: account.get("Name"),
                short: true
            });
            fields.push({
                title: "Link",
                value: "https://test.salesforce.com/" + account.getId(),
                short: true
            });
            fields.push({
                title: "Phone",
                value: account.get("Phone"),
                short: true
            });
            fields.push({
                title: "Address",
                value: account.get("BillingStreet") + ", " + account.get("BillingCity") + " " + account.get("BillingState"),
                short: true
            });
            attachments.push({
                color: color,
                fields: fields
            });
        });
        return attachments;
    } else {
        return [{
            text: "No records"
        }];
    }

};

let formatContacts = contacts => {

    if (contacts && contacts.length > 0) {
        let attachments = [];
        contacts.forEach(contact => {
            let fields = [];
            fields.push({
                title: "Name",
                value: contact.get("Name"),
                short: true
            });
            fields.push({
                title: "Email",
                value: contact.get("Email"),
                short: true
            });
            fields.push({
                title: "Phone",
                value: contact.get("Phone"),
                short: true
            });
            fields.push({
                title: "Mobile",
                value: contact.get("MobilePhone"),
                short: true
            });
            fields.push({
                title: "Link",
                value: "https://test.salesforce.com/" + contact.getId(),
                short: false
            });
            attachments.push({
                color: color,
                fields: fields
            });
        });
        return attachments;
    } else {
        return [{
            text: "No records"
        }];
    }

};

let formatContact = contact => {

    let fields = [];
    fields.push({
        title: "Name",
        value: contact.get("FirstName") + " " + contact.get("LastName"),
        short: true
    });
    fields.push({
        title: "Phone",
        value: contact.get("Phone"),
        short: true
    });
    fields.push({
        title: "Title",
        value: contact.get("Title"),
        short: false
    });
    fields.push({
        title: "Link",
        value: "https://test.salesforce.com/" + contact.getId(),
        short: false
    });
    return [{
        color: color,
        fields: fields
    }];

};

let formatOpportunities = opportunities => {

    if (opportunities && opportunities.length > 0) {
        let attachments = [];
        opportunities.forEach(opportunity => {
            let fields = [];
            fields.push({
                title: "Opportunity",
                value: opportunity.get("Name"),
                short: true
            });
            fields.push({
                title: "Stage",
                value: opportunity.get("StageName"),
                short: true
            });
            fields.push({
                title: "Amount",
                value: new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(opportunity.get("Amount")),
                short: true
            });
            fields.push({
                title: "Probability",
                value: opportunity.get("Probability") + "%",
                short: true
            });
            fields.push({
                title: "Link",
                value: "https://test.salesforce.com/" + opportunity.getId(),
                short: false
            });
            attachments.push({
                color: color,
                fields: fields
            });
        });
        return attachments;
    } else {
        return [{
            text: "No records"
        }];
    }

};

let formatCase = _case => {

    let fields = [];
    fields.push({
        title: "Subject",
        value: _case.get("subject"),
        short: true
    });
    fields.push({
        title: "Link",
        value: 'https://test.salesforce.com/' + _case.get("id"),
        short: true
    });
    fields.push({
        title: "Description",
        value: _case.get("description"),
        short: false
    });
    return [{
        color: color,
        fields: fields
    }];

};

let formatHiringManager = hiringManagers => {

    if (hiringManagers && hiringManagers.length > 0) {
        let attachments = [];
        hiringManagers.forEach(hiringManager => {
            let fields = [];
            fields.push({
                title: "Name",
                value: hiringManager.get("Name"),
                short: true
            });
            fields.push({
                title: "Email",
                value: hiringManager.get("Email"),
                short: true
            });
            attachments.push({
                color: color,
                fields: fields
            });
        });
        return attachments;
    } else {
        return [{
            text: "No records"
        }];
    }

};

exports.formatAccounts = formatAccounts;
exports.formatContacts = formatContacts;
exports.formatContact = formatContact;
exports.formatOpportunities = formatOpportunities;
exports.formatCase = formatCase;
exports.formatHiringManager = formatHiringManager;