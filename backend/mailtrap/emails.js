import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
	const recipient = [{ email }];

	try {
		console.log(`Sending verification email to ${email}`);
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			category: "Email Verification",
		});

		console.log("Email sent successfully", response);
		return response;
	} catch (error) {
		console.error(`Error sending verification email:`, error);
		
		// More detailed error logging
		if (error.response) {
			console.error('Mailtrap API response error:', {
				status: error.response.status,
				data: error.response.data,
			});
		}

		throw new Error(`Error sending verification email: ${error.message || error}`);
	}
};

export const sendWelcomeEmail = async (email, name) => {
	const recipient = [{ email }];

	try {
		console.log(`Sending welcome email to ${email}`);
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			template_uuid: "e65925d1-a9d1-4a40-ae7c-d92b37d593df",
			template_variables: {
				company_info_name: "Auth Company",
				name: name,
			},
		});

		console.log("Welcome email sent successfully", response);
		return response;
	} catch (error) {
		console.error(`Error sending welcome email:`, error);
		
		// More detailed error logging
		if (error.response) {
			console.error('Mailtrap API response error:', {
				status: error.response.status,
				data: error.response.data,
			});
		}

		throw new Error(`Error sending welcome email: ${error.message || error}`);
	}
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];

	try {
		console.log(`Sending password reset email to ${email} with reset URL: ${resetURL}`);
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
		
		console.log("Password reset email sent successfully", response);
		return response;
	} catch (error) {
		console.error(`Error sending password reset email:`, error);
		
		// More detailed error logging
		if (error.response) {
			console.error('Mailtrap API response error:', {
				status: error.response.status,
				data: error.response.data,
			});
		}

		throw new Error(`Error sending password reset email: ${error.message || error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		console.log(`Sending password reset success email to ${email}`);
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		console.log("Password reset success email sent successfully", response);
		return response;
	} catch (error) {
		console.error(`Error sending password reset success email:`, error);
		
		// More detailed error logging
		if (error.response) {
			console.error('Mailtrap API response error:', {
				status: error.response.status,
				data: error.response.data,
			});
		}

		throw new Error(`Error sending password reset success email: ${error.message || error}`);
	}
};