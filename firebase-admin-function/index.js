const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = async function (req, res) {
  try {
    const message = {
      notification: {
        title: 'Тест',
        body: 'Firebase работает',
      },
      token: 'en5FPEPUTISW216GM8-9qb:APA91bFX9aFIXWVGV9DN064iCww-qRo38udJHQ8D8YqbqlNzF8T296PpHEgBiNMCHUakJfU2nqeldjnv2wmeFnlZu9ojHqHvMf45yZ5n0x8RqV1HEulzSIE',
    };

    const response = await admin.messaging().send(message);

    return JSON.stringify({
      success: true,
      response,
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
};