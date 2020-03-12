import auth0 from "auth0-js";
import config from "./config/default";

class Auth {
	constructor() {
		this.auth0 = new auth0.WebAuth({
			domain: config.AUTH0_DOMAIN,
			clientID: config.AUTH0_CLIENT_ID,
			redirectUri: "http://localhost:3000/callback",
			audience: config.AUTH0_AUDIENCE,
			responseType: "token id_token",
			scope: "openid email profile"
		});
		this.authFlag = "isLoggedIn";
		this.signIn = this.signIn.bind(this);
		this.signOut = this.signOut.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
	}

	signIn() {
		this.auth0.authorize();
	}

	getIdToken() {
		return this.idToken;
	}

	handleAuthentication() {
		return new Promise((resolve, reject) => {
			this.auth0.parseHash((err, authResult) => {
				if (err) return reject(err);
				if (!authResult || !authResult.idToken) {
					return reject(err);
				}
				this.setSession(authResult);
				resolve();
			});
		});
	}
	setSession(authResult) {
		this.idToken = authResult.idToken;
		localStorage.setItem(this.authFlag, JSON.stringify(true));
	}

	signOut() {
		localStorage.setItem(this.authFlag, JSON.stringify(false));
		this.auth0.logout({
			returnTo: "http://localhost:3000",
			clientID: config.AUTH0_CLIENT_ID
		});
	}

	silentAuth() {
		if (this.isAuthenticated()) {
			return new Promise((resolve, reject) => {
				this.auth0.checkSession({}, (err, authResult) => {
					if (err) {
						localStorage.removeItem(this.authFlag);
						return reject(err);
					}
					this.setSession(authResult);
					resolve();
				});
			});
		}
	}

	isAuthenticated() {
		return JSON.parse(localStorage.getItem(this.authFlag));
	}
}

const auth = new Auth();

export default auth;
