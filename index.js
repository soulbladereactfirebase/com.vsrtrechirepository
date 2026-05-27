const sdk = require('node-appwrite');
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = async function (req, res) {
  try {
    const token = 'en5FPEPUTISW216GM8-9qb:APA91bFX9aF IXWVGV9DN064iCww-qRo38udJHQ8D8Yq bqlNzF8T296PpHEgBiNMCHUakJfU2nqeld jnv2wmeFnlZu9ojHqHvMf45yZ5n0x8RqV1 HEulzSIE';

    const message = {
      notification: {
        title: 'Тест',
        body: 'Firebase работает',
      },
      token: token,
    };

    const response = await admin.messaging().send(message);

    return res.json({
      success: true,
      response,
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};