import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../Queries/query';


function BookDetail(props) {
    const { loading, error, data } =  useQuery(GET_BOOK, {
      variables:{ id: props.bookId}
    });
     
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(  </p>;
    if (data){
     const book = data.book;
      if (book){
        return(
          <div id="book-details">
          <h2>Book Details</h2>
          <h4>Book Name : {book.name}</h4>
          <h4>Genre : {book.genre}</h4>
         </div>
        )

      }
    }

    }
  
export default BookDetail;