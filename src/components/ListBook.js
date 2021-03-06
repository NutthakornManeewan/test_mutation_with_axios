import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const LIST_BOOKS = gql`
	query {
		get_user_by_id(user_id: "5e60bc784728327f98e14337") {
			_id
			user_name
		}
	}
`;

export default () => (
	<Query query={LIST_BOOKS}>
		{({ loading, error, data }) => {
			if (!!data) return <p>{JSON.stringify(data)}</p>;
			if (loading) return <p>Loading...</p>;
			if (error) return <p>{JSON.stringify(error)}</p>;

			return (
				<div className="col-sm-12">
					{!loading &&
						data.books.map(book => (
							<div className="col-sm-4" key={book.id}>
								<div className="pa3 bg-black-05 ma3">
									<div
										style={{
											backgroundImage: `url(${book.cover_image_url})`,
											backgroundSize: "cover",
											paddingBottom: "100%"
										}}
									/>
									<div>
										<div className="book">
											<h3 align="center">
												{" "}
												{book.title}&nbsp;{" "}
											</h3>
											<h4 align="center">
												Average Rating:{" "}
												{book.average_rating} / 10{" "}
											</h4>
										</div>
									</div>
								</div>
							</div>
						))}
				</div>
			);
		}}
	</Query>
);
