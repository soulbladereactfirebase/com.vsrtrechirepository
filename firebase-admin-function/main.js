const admin = require("firebase-admin");

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = async ({ req, res, log, error }) => {
  try {
    const body = req.bodyJson || {};

    const token = body.token;
    const title = body.title || "Тест";
    const message = body.message || "Пуш работает";

    if (!token) {
      return res.json({
        success: false,
        error: "No token provided",
      });
    }

    const result = await admin.messaging().send({
      token,
      notification: {
        title,
        body: message,
      },
    });

    log(result);

    return res.json({
      success: true,
      result,
    });
  } catch (e) {
    error(e);

    return res.json({
      success: false,
      error: e.message,
    });
  }
};