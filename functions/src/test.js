const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require("cors");
const sendgrid = require('@sendgrid/mail');
const config = require("./config.json");

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(cors());

const getEmailHtmlBody = (name, email, subject, message) => {
    var html = `<div>Name: ${name}</div>
    <div>Email: ${email}</div>
    <div>subject: ${subject}</div>
    <div>Message: ${message}</div>`;
    return html;
}

app.get("/", (request, response) => {
    response.send("Server is up and running");
});

app.get("/contact", (request, res) => {
    console.log("query params: => " + JSON.stringify(request.query));
    const {
        name,
        email,
        subject,
        message
    } = request.query;
    sendgrid.setApiKey(config.sendgrid.API_KEY);

    const emailBody = {
        to: "mj@greysprings.com",
        from: "mj@konstantx.com",
        cc: email,
        subject: subject,
        text: message || "No message provided.",
        html: getEmailHtmlBody(name, email, subject, message)
    }

    sendgrid.send(emailBody).then((response) => {
        const result = response[0];
        if (result.statusCode === 200 || result.statusCode === 202) {
            res.send({
                error: null,
                statusCode: result.statusCode
            });
        } else {
            res.send({
                error: "Error submitting your query. Please try again later.",
                statusCode: result.statusCode
            });
        }

        return true;
    }).catch(err => console.log(err));

});

exports.app = functions.https.onRequest(app);