const admin = require('firebase-admin');

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = async function (req, res) {
  try {
    const message = {
      token: 'fOMFH9MMQOKO9LZ6K-J16Z:APA91bGH2 hHjNkjZthz9AMCNgiqj2ziNszFtiL1ILTNOqo iWyUhyZbct1mEN3nErj4j-T6aljQ3sOONPYb SE1ljkYdJUwGCE3vhxxDTQcTtYBJzpvVBfn FO',
      notification: {
        title: 'TEST',
        body: 'Firebase работает',
      },
    };

    const response = await admin.messaging().send(message);

    return res.json({
      success: true,
      response,
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err.message,
    });
  }
};