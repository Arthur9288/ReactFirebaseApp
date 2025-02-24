const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createUserProfile = functions.auth.user().onCreate(async (user) => {
  const userProfile = {
    email: user.email,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  try {
    await admin.firestore().collection('users').doc(user.uid).set(userProfile);
    console.log('User profile created successfully:', user.uid);
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
});