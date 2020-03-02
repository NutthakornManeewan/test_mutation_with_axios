import axios from "axios";
import config from "../config/default";
import { print } from "graphql";
import gql from "graphql-tag";

const CREATE_USER = gql`
	mutation create_user(
		$user_name: String!
		$user_email: String!
		$user_address: String!
		$user_phone: String
	) {
		create_user(
			user_name: $user_name
			user_email: $user_email
			user_address: $user_address
			user_phone: $user_phone
		) {
			_id
			user_name
			user_email
			user_address
			user_phone
			created_date
		}
	}
`;

export const callMutation = async args => {
	console.log("args ==>", args);
	const { user_name, user_email, user_phone, user_address } = { ...args };
	try {
		const response = await axios({
			url: config.SERVER_URL,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*"
			},
			data: {
				query: print(CREATE_USER),
				variables: {
					user_name,
					user_email,
					user_address,
					user_phone
				}
			}
		});
		console.log("response ==>", response);
		return response.data;
	} catch (call_api_error) {
		throw call_api_error;
	}
};
