import { initializeApp, cert } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";

const serviceAccount = JSON.parse(atob(process.env.ZAGREBSPORT_FIREBASE_ADMIN_SDK_SERVICE_ACCOUNT_BASE64));

// Initialize Firebase Admin SDK using the in-memory service account object
initializeApp({
    credential: cert(serviceAccount)
});

export const cloudPush = async (topic, text) => {
    try {
        const message = {
            notification: {
                title: "Zagreb Sport",
                body: text,
            },
            topic: topic,
        };

        const response = await getMessaging().send(message);
        console.log(`Notification sent successfully: ${response}`);
        return response;
    } catch (error) {
        console.error("Error sending notification:", error);
        throw error;
    }
};

export default cloudPush;
