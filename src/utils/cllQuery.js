import axios from "axios";
import config from "../config/default";
import { print } from "graphql";
import gql from "graphql-tag";

const GET_FIELDS = gql`
	query {
		get_all_field {
			_id
			field_name
			field_ph
			field_owner {
				_id
			}
		}
	}
`;

export const callQuery = async () => {
	try {
		const response = await axios({
			url: config.SERVER_URL,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*"
			},
			data: { query: print(GET_FIELDS) }
		});
		console.log("response ==>", response);
		return response.data;
	} catch (call_api_error) {
		throw call_api_error;
	}
};
