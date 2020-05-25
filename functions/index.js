const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const gcs = require('@google-cloud/storage')
const os = require('os')
const path = require('path')
const spawn = require('child-process-promise').spawn

exports.uploadFile = functions.https.onRequest((req, res) => {
    res.status(200).json('uploaded file successfully')
})