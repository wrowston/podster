// // <!-- The core Firebase JS SDK is always required and must be listed first -->
// "https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js"

// // <!-- TODO: Add SDKs for Firebase products that you want to use
// //      https://firebase.google.com/docs/web/setup#available-libraries -->
// "https://www.gstatic.com/firebasejs/7.14.5/firebase-analytics.js"

import * as firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCcB9cBsNvzo95EGn2ewYoAAgSUp6TTyEk",
    authDomain: "podster-37c8c.firebaseapp.com",
    databaseURL: "https://podster-37c8c.firebaseio.com",
    projectId: "podster-37c8c",
    storageBucket: "podster-37c8c.appspot.com",
    messagingSenderId: "408405251173",
    appId: "1:408405251173:web:8e81f77043181bed2fe28c",
    measurementId: "G-7BDLE6B239"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const ref = firebase.storage().ref();


// local helper function
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

async function uploadCommonImage(image) {
    const guidFileName = generateUUID();
    const imagePath = `common/images/${guidFileName}`;
    const uploadTask = await ref.child(imagePath).put(image, { contentType: image.type });
    return uploadTask;
}

async function deleteCommonImage(imageName) {
    const imagePath = `common/images/${imageName}`;
    const deleteTask = await ref.child(imagePath).delete();
    return deleteTask;
}

export {
    uploadCommonImage,
    deleteCommonImage
};