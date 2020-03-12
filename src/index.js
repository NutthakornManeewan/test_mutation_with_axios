import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import auth from "./Auth";
import config from "./config/default";

import { BrowserRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import * as serviceWorker from "./serviceWorker";

const uri = `https://${config.HOST_NAME}:${config.SERVICE_PORT}/graphql`;
console.log("uri", uri);
const client = new ApolloClient({
	uri,
	request: operation => {
		operation.setContext(context => ({
			headers: {
				...context.headers,
				authorization: auth.getIdToken()
			}
		}));
	}
});

ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
serviceWorker.unregister();
