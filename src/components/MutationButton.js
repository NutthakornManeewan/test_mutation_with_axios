import React from "react";

const MutationButton = props => {
	return <button onClick={props.clicked}>{props.mutation_label}</button>;
};

export default MutationButton;
