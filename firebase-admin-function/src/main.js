const admin = require('firebase-admin');

let firebaseApp;

module.exports = async function (req, res) {

  try {

    if (!firebaseApp) {

      const serviceAccount =
        JSON.parse(
          process.env
            .FIREBASE_SERVICE_ACCOUNT
        );

      firebaseApp =
        admin.initializeApp({
          credential:
            admin.credential.cert(
              serviceAccount
            ),
        });
    }

    const body =
      JSON.parse(req.body || '{}');

    const {
      token,
      title,
      message,
    } = body;

    const response =
      await admin.messaging().send({

        token,

        notification: {
          title,
          body: message,
        },

        android: {
          priority: 'high',

          notification: {
            sound: 'default',
            channelId: 'default',
          },
        },
      });

    return res.json({
      success: true,
      response,
    });

  } catch (error) {

    console.error(error);

    return res.json({
      success: false,
      error: error.message,
    });
  }
};