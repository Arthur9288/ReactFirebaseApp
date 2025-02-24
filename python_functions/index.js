// Import 1st Gen Firebase Functions for Auth Triggers
const functions = require("firebase-functions");

// Import 2nd Gen Firebase Functions for HTTP Triggers
// const functionsV2 = require("firebase-functions/v2");

// Import Firebase Admin SDK
const admin = require("firebase-admin");

// Initialize Firebase Admin
admin.initializeApp();



// HTTP function using 2nd Gen syntax
exports.helloWorld = functionsV2.https.onRequest((req, res) => {
     res.send("Hello from Firebase!")
});

// Auth trigger using 1st Gen syntax
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
    try {
        // Log the new user's UID and email
        console.log(`New user created: UID=${user.uid}, Email=${user.email}`);

                // Randomly select between two profile images
        const profileImages = [
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fangrybirdsgame.fandom.com%2Fpt-br%2Fwiki%2FRed&psig=AOvVaw3kiK7UgEIL2BRG0MEoGksL&ust=1739838747631000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDnpMW6yYsDFQAAAAAdAAAAABAE",
            "https://i.pinimg.com/736x/8a/f7/de/8af7de6fd1569eb0c47579eda0210a96.jpg"
        ];
        const randomProfileImage = profileImages[Math.floor(Math.random() * profileImages.length)];
        // Store profileImage and userEmails directly in the user's document in the 'userProfile' field
        await admin.firestore().collection('users').doc(user.uid).set({
            userProfile: {
                profileImage: randomProfileImage,
                userEmail: user.email
            }
        }, { merge: true }); // Use merge to avoid overwriting existing fields, if any

        // If you have additional logic, add it here

    } catch (error) {
        console.error('Error handling new user creation:', error);
    }
});

exports.onUserCreate = functions.auth.user().onCreate((user) => {
    const uid = user.uid;
    const email = user.email;
  
    return admin.firestore().collection('users').doc(uid).set({
      email: email
    });
  });