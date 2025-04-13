import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

// Check if Mailtrap credentials are available
if (!process.env.MAILTRAP_TOKEN) {
    console.error("MAILTRAP_TOKEN is not set in environment variables");
}

if (!process.env.MAILTRAP_ENDPOINT) {
    console.error("MAILTRAP_ENDPOINT is not set in environment variables");
}

// Create Mailtrap client with error handling
export const mailtrapClient = new MailtrapClient({
    endpoint: process.env.MAILTRAP_ENDPOINT || "https://send.api.mailtrap.io/",
    token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "RapidRoutines AI",
};