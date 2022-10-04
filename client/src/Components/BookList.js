import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../Queries/query';



function BookList() {
  const { loading, error, data } =  useQuery(GET_BOOKS);
  console.log(useQuery(GET_BOOKS))
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(  </p>;
  if (data)
    return (
          data.books.map((book) => {
            return(
              <>
                <ul key={book?.id}>
                    <li>{book.name}</li>
                </ul>
              </>
            )
          })
    );
  }
  
  export default BookList;
  