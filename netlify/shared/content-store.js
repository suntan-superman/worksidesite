const { cert, getApps, initializeApp } = require("firebase-admin/app");
const { FieldValue, getFirestore } = require("firebase-admin/firestore");

const PROJECT_ID = "workside-4b103";

function getDb() {
  let app = getApps()[0];
  if (!app) {
    if (process.env.FIRESTORE_EMULATOR_HOST) app = initializeApp({ projectId: PROJECT_ID });
    else {
      let credential;
      try { credential = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || ""); }
      catch { throw Object.assign(new Error("Firebase Admin credential is invalid"), { code: "CONFIG_INVALID" }); }
      if (credential.project_id !== PROJECT_ID) throw Object.assign(new Error("Firebase Admin project mismatch"), { code: "CONFIG_INVALID" });
      app = initializeApp({ credential: cert(credential), projectId: PROJECT_ID });
    }
  }
  return getFirestore(app);
}

function serverTimestamp() { return FieldValue.serverTimestamp(); }

module.exports = { getDb, serverTimestamp };
