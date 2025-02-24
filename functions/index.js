// Use the 1st Gen API for Firebase Functions by importing from v1
const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');
admin.initializeApp();


// 1st Gen Auth trigger using v1 syntax
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  try {
    console.log(`New user created: UID=${user.uid}, Email=${user.email}`);

    // Pick a random profile image
    const profileImages = [
      'https://firebasestorage.googleapis.com/v0/b/app2-85da0.firebasestorage.app/o/defaultprofile%2Fdefaultprofile%2FXHi4FQ1Pom4sxvJ3-generated_image.jpg?alt=media&token=4ceee855-7f60-4559-8ec2-248d9d317557',
      'https://firebasestorage.googleapis.com/v0/b/app2-85da0.firebasestorage.app/o/defaultprofile%2Fdefaultprofile%2FsltwbiqV5cqk5z3s-generated_image.jpg?alt=media&token=4742b207-c2d0-44e3-8ef1-493360feb9ae',
    ];
    const randomProfileImage = profileImages[Math.floor(Math.random() * profileImages.length)];

    // Store profileImage and userEmail in Firestore
    await admin.firestore().collection('users').doc(user.uid).set({
      userProfile: {
        profileImage: randomProfileImage,
        userEmail: user.email,
      },
    }, { merge: true });
  } catch (error) {
    console.error('Error handling new user creation:', error);
  }
});
