import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS, GET_BOOK, DELETE_BOOK } from '../Queries/query';


function BookDetail(props) {
    const { loading, error, data } =  useQuery(GET_BOOK, {
      variables:{ id: props.bookId}
    });
    
    const [deleteBook] = useMutation(DELETE_BOOK,{
      refetchQueries: [{ query: GET_BOOKS }],
    });

    const handleDelete = (e) =>{
      e.preventDefault();
      deleteBook({
        variables: {id: props.bookId} 
      })
      console.log(props.bookId, "getting book id")

    }

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
          <button type='button' onClick={handleDelete}>delete</button>
         </div>
        )

      }
    }

    }
  
export default BookDetail;