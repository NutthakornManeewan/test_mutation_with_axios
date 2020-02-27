import React, { useState } from "react";
import MutationButton from "./components/MutationButton";
import { callMutation } from "./utils/callMutation";

function App() {
	const [mutatation_state, set_mutatation_state] = useState({});

	const callTheHeaven = async () => {
		try {
			const testInput = {
				user_name: "Cherprang Areekul",
				user_email: "cherprang@bnk48.com",
				user_phone: "+66858707990",
				user_address: "BNK48 Office (IAM48)"
			};
			const res = await callMutation(testInput);
			set_mutatation_state(res);
		} catch (response_error) {
			console.log("Response error ==>", response_error);
		}
	};

	return (
		<div className="App">
			<MutationButton
				mutation_label="MUTATION"
				clicked={() => callTheHeaven()}
			/>
			<div>{JSON.stringify(mutatation_state)}</div>
		</div>
	);
}

export default App;
