// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
var express = require('express');
var sendgrid = require('@sendgrid/mail')
// var cors = require('cors');
const app = express();

// app.use(cors());
const cors = require('cors')({
    origin: true
});

sendgrid.setApiKey("Your sendgrde Api key");

const getEmailHtmlBody = (name, email, subject, message) => {
    var html = `<div>Name: ${name}</div>
  <div>Email: ${email}</div>
  <div>subject: ${subject}</div>
  <div>Message: ${message}</div>`;
    return html;
}

exports.contact = functions.https.onRequest(async (request, res) => {
    cors(request, res, () => {
        console.log("params: " + request.param);
        console.log("query: " + JSON.stringify(request.query));
        //const original = req.query.text;
        // const name = request.query.name;
        // const subject = request.query.subject;
        // const email = request.query.email;
        // const message = request.query.message;
        // var error = null;

        // var testData = "Welcome " + name;
        // response.send({error: error, testData: testData});

        const {
            name,
            email,
            subject,
            message
        } = request.query;

        const emailBody = {
            to: "shatru@greysprings.com",
            from: "prakashshatru@gmai.com",
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
});


const getSignUpHtmlBody = (email) => {
    var html = `<div>"[Greysprings Website]: Signup Request"</div>
            <div>User email to signup: ${email} </div>`
    return html;
}

exports.signup = functions.https.onRequest(async (request, res) => {
    cors(request, res, () => {
        //console.log("query: " + JSON.stringify(request.query));

        const {
            email
        } = request.query;

        const e1 = { email };

        sendgrid.setApiKey("your sendgride api key");

        const emailBody = {
            to: "shatru@greysprings.com",
            from: "appninja.greysprings@gmail.com",
            subject: "[Greysprings Website]: Signup Request",
            html: getSignUpHtmlBody(e1)
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
});
