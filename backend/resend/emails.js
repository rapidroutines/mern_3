import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
	WELCOME_EMAIL_TEMPLATE
  } from "./emailTemplates.js";
  import { resendClient, sender } from "./resend.config.js";
  
  export const sendVerificationEmail = async (email, verificationToken) => {
	try {
	  const response = await resendClient.emails.send({
		from: `${sender.name} <${sender.email}>`,
		to: email,
		subject: "Verify your email",
		html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
	  });
  
	  console.log("Email sent successfully", response);
	} catch (error) {
	  console.error(`Error sending verification email:`, error);
	  throw new Error(`Error sending verification email: ${error.message}`);
	}
  };
  
  export const sendWelcomeEmail = async (email, name) => {
	try {
	  const response = await resendClient.emails.send({
		from: `${sender.name} <${sender.email}>`,
		to: email,
		subject: "Welcome to Our Platform",
		html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name).replace("{company}", "Auth Company"),
	  });
  
	  console.log("Welcome email sent successfully", response);
	} catch (error) {
	  console.error(`Error sending welcome email`, error);
	  throw new Error(`Error sending welcome email: ${error.message}`);
	}
  };
  
  export const sendPasswordResetEmail = async (email, resetURL) => {
	try {
	  const response = await resendClient.emails.send({
		from: `${sender.name} <${sender.email}>`,
		to: email,
		subject: "Reset your password",
		html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
	  });
  
	  console.log("Password reset email sent successfully", response);
	} catch (error) {
	  console.error(`Error sending password reset email`, error);
	  throw new Error(`Error sending password reset email: ${error.message}`);
	}
  };
  
  export const sendResetSuccessEmail = async (email) => {
	try {
	  const response = await resendClient.emails.send({
		from: `${sender.name} <${sender.email}>`,
		to: email,
		subject: "Password Reset Successful",
		html: PASSWORD_RESET_SUCCESS_TEMPLATE,
	  });
  
	  console.log("Password reset success email sent successfully", response);
	} catch (error) {
	  console.error(`Error sending password reset success email`, error);
	  throw new Error(`Error sending password reset success email: ${error.message}`);
	}
  };