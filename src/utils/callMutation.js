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

const CREATE_FIELD = gql`
	mutation create_field(
		$field_name: String!
		$field_area: Float!
		$field_owner: String!
		$field_location: String!
		$field_description: String
		$field_soil_type: String
		$field_nitrogen_quantity: String
		$field_phosphorus_quantity: String
		$field_potassium_quantity: String
		$field_ph: Float
	) {
		create_field(
			field_ph: $field_ph
			field_name: $field_name
			field_area: $field_area
			field_location: $field_location
			field_description: $field_description
			field_soil_type: $field_soil_type
			field_nitrogen_quantity: $field_nitrogen_quantity
			field_phosphorus_quantity: $field_phosphorus_quantity
			field_potassium_quantity: $field_potassium_quantity
			field_owner: $field_owner
		) {
			_id
			field_name
			field_owner {
				_id
			}
		}
	}
`;

export const callMutation = async args => {
	console.log("args ==>", args);
	const { user_name, user_email, user_phone, user_address } = { ...args };
	try {
		const response = await axios({
			url: `https://${config.HOST_NAME}:${config.SERVICE_PORT}/graphql`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*"
			},
			data: {
				query: print(CREATE_FIELD),
				variables: {
					field_ph: 7,
					field_name: "Pareena field",
					field_area: 15,
					field_location: "5e4f4b5652ceaa70e94c14a6",
					field_description: "This is Pareena field",
					field_soil_type: "SANDY",
					field_nitrogen_quantity: "MEDIUM",
					field_phosphorus_quantity: "HIGH",
					field_potassium_quantity: "LOW",
					field_owner: "5e4f3d2172f987507bc9c677"
				}
			}
		});
		console.log("response ==>", response);
		return response.data;
	} catch (call_api_error) {
		throw call_api_error;
	}
};
