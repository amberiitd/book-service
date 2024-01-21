import React from "react";

const ShowList = ({ books = [] }) => {
	return (
		<table>
			<tr>
				<th>Title</th>
				<th>Type</th>
				<th>Decription</th>
			</tr>
      
			<tbody>
				{books.map((book, index) => (
					<tr key={`book-${book.isbn || index}`}>
						<td>{book.title}</td>
						<td>{book.author}</td>
						<td>
              {book.publication_year}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default ShowList;
