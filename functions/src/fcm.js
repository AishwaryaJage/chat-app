/* eslint-disable require-jsdoc */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const database = admin.database();
const messaging = admin.messaging();

// eslint-disable-next-line max-len
exports.sendFcm = functions
  .region('europe-west3')
  .https.onCall(async (data, context) => {
    checkIfAuth(context);
    const { chatId, title, message } = data;
    const roomSnap = await database.ref(`/rooms/${chatId}`).once('value');

    if (!roomSnap.exists()) {
      return false;
    }
    const roomData = roomSnap.val();

    checkIfAllowed(context, transformToArray(roomData.admins));
    const fcmUsers = transformToArray(roomData.fcmUsers);
    const userTokensPromises = fcmUsers.map(uid => getUserTokens(uid));
    const userTokensResult = await Promise.all(userTokensPromises);

    const tokens = userTokensResult.reduce(
      (accTokens, useTokens) => [...accTokens, ...useTokens],
      []
    );

    if (tokens.length === 0) {
      return false;
    }
    const fcmMessage = {
      notification: {
        title: `${title} (${roomData.name})`,
        body: message,
      },
      tokens,
    };
    const batchResponse = await messaging.sendMulticast(fcmMessage);

    if (batchResponse.failureCount > 0) {
      const failedTokens = [];
      batchResponse.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(tokens[idx]);
        }
      });
      const removePromises = failedTokens.map(token =>
        database.ref(`/fcm_tokens/${token}`).remove()
      );
      return Promise.all(removePromises).catch(err => err.message);
    }
  });

function checkIfAuth(context) {
  if (!context.auth) {
    // eslint-disable-next-line max-len
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You have to be signed in'
    );
  }
}

function checkIfAllowed(context, chatAdmins) {
  if (!chatAdmins.includes(context.auth.uid)) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Restricted Access'
    );
  }
}
function transformToArray(snapVal) {
  return snapVal ? Object.keys(snapVal) : [];
}

async function getUserTokens(uid) {
  const userTokenSnap = await database
    .ref('/fcm_tokens')
    .orderByValue()
    .equalTo(uid)
    .once('value');

  if (!userTokenSnap.hasChildren()) {
    return [];
  }
  return Object.keys(userTokenSnap.val());
}
