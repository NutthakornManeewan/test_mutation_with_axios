import React from "react";
import Nav from "./components/Nav";
import ListBook from "./components/ListBook";
import CreateBook from "./components/CreateBook";
import Callback from "./components/Callback";
import auth from "./Auth";
import GuardedRoute from "./components/GuardedRoute";
import { Route, withRouter } from "react-router-dom";

class App extends React.Component {
	async componentDidMount() {
		if (this.props.location.pathname === "/callback") return;
		try {
			await auth.silentAuth();
			this.forceUpdate();
		} catch (err) {
			if (err.error === "login_required") return;
			console.log(err.error);
		}
	}

	render() {
		return (
			<div className="App">
				<div>
					<Nav />
					<Route exact path="/" component={ListBook} />
					<GuardedRoute exact path="/create" component={CreateBook} />
					<Route exact path="/callback" component={Callback} />
				</div>
			</div>
		);
	}
}

export default withRouter(App);
