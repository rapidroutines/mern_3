import { create } from "zustand";
import axios from "axios";

// Fix the API URL to point to your actual backend
const API_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5000/api/auth" 
  : "/api/auth"; // This should be a relative URL for production

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

	signup: async (email, password, name) => {
		set({ isLoading: true, error: null });
		try {
			console.log(`Sending signup request to ${API_URL}/signup`);
			const response = await axios.post(`${API_URL}/signup`, { email, password, name });
			console.log("Signup response:", response.data);
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			console.error("Signup error:", error);
			const errorMessage = error.response?.data?.message || 
				 error.message || 
				 "Unknown error during signup";
			set({ error: errorMessage, isLoading: false });
			throw error;
		}
	},
	
	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			console.log(`Sending login request to ${API_URL}/login`);
			const response = await axios.post(`${API_URL}/login`, { email, password });
			console.log("Login response:", response.data);
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			console.error("Login error:", error);
			const errorMessage = error.response?.data?.message || 
				 error.message || 
				 "Error logging in";
			set({ error: errorMessage, isLoading: false });
			throw error;
		}
	},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			console.log(`Sending logout request to ${API_URL}/logout`);
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			console.error("Logout error:", error);
			const errorMessage = error.response?.data?.message || 
				 error.message || 
				 "Error logging out";
			set({ error: errorMessage, isLoading: false });
			throw error;
		}
	},
	
	verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			console.log(`Sending verify email request to ${API_URL}/verify-email`);
			const response = await axios.post(`${API_URL}/verify-email`, { code });
			console.log("Verify email response:", response.data);
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error) {
			console.error("Verify email error:", error);
			const errorMessage = error.response?.data?.message || 
				 error.message || 
				 "Error verifying email";
			set({ error: errorMessage, isLoading: false });
			throw error;
		}
	},
	
	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			console.log(`Sending check auth request to ${API_URL}/check-auth`);
			const response = await axios.get(`${API_URL}/check-auth`);
			console.log("Check auth response:", response.data);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			console.error("Check auth error:", error);
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
	
	forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			console.log(`Sending forgot password request to ${API_URL}/forgot-password`);
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			console.log("Forgot password response:", response.data);
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			console.error("Forgot password error:", error);
			const errorMessage = error.response?.data?.message || 
				 error.message || 
				 "Error sending reset password email";
			set({ isLoading: false, error: errorMessage });
			throw error;
		}
	},
	
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			console.log(`Sending reset password request to ${API_URL}/reset-password/${token}`);
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			console.log("Reset password response:", response.data);
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			console.error("Reset password error:", error);
			const errorMessage = error.response?.data?.message || 
				 error.message || 
				 "Error resetting password";
			set({ isLoading: false, error: errorMessage });
			throw error;
		}
	},
}));