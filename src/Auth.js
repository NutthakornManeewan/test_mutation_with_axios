import auth0 from "auth0-js";

class Auth {
	constructor() {
		this.auth0 = new auth0.WebAuth({
			domain: "dev-7bz6bzqd.auth0.com",
			clientID: "tnPzi0onlXvuUBL3Al74Fy0bvzf7CCvc",
			redirectUri: "http://localhost:3000/callback",
			audience: "https://dev-7bz6bzqd.auth0.com/userinfo",
			responseType: "token id_token",
			scope: "openid email"
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
			clientID: "tnPzi0onlXvuUBL3Al74Fy0bvzf7CCvc"
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
