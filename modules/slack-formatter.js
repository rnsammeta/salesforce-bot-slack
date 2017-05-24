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

let formatRequisition = req => {

    let fields = [];
    fields.push({
        title: "Status",
        value: req._fields.requisition_status__c,
        short: true
    });
    fields.push({
        title: "Job Code/Title",
        value: req._fields.job_title_or_job_code__c,
        short: true
    });
    fields.push({
        title: "Hiring Manager",
        value: req._fields.hiring_manager__c,
        short: true
    });
    fields.push({
        title: "Number of Openings",
        value: req._fields.number_of_openings__c,
        short: true
    });
    fields.push({
        title: "New Headcount or Replacement",
        value: req._fields.new_headcount_or_replacement__c,
        short: true
    });
    fields.push({
        title: "Employee Type",
        value: req._fields.employee_type__c,
        short: true
    });
    fields.push({
        title: "Schedule",
        value: req._fields.schedule__c,
        short: true
    });
    fields.push({
        title: "Primary Location",
        value: req._fields.primary_location__c,
        short: true
    });
    fields.push({
        title: "Justification",
        value: req._fields.justification__c,
        short: true
    });
    fields.push({
        title: "Open in Salesforce:",
        value: 'https://test.salesforce.com/' + req.get("id"),
        short: false
    });

    return [{
        color: color,
        fields: fields
        }];
};

exports.formatAccounts = formatAccounts;
exports.formatContacts = formatContacts;
exports.formatContact = formatContact;
exports.formatOpportunities = formatOpportunities;
exports.formatCase = formatCase;
exports.formatHiringManager = formatHiringManager;
exports.formatRequisition = formatRequisition;