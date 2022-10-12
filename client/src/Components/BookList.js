import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS  } from '../Queries/query';
import BookDetail from './BookDetails';



function BookList() {
  const { loading, error, data } =  useQuery(GET_BOOKS);
  const [selected, setSelected] = useState();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(  </p>;
  if (data)
    return (
          <>
          <ul id="book-list">
            {data.books.map((book) => {
              return(
                <li 
                className='listItem'
                  key={book?.id} 
                  onClick={()=> setSelected(book.id)}
                >
                {book.name}
                </li>
              )}
            )}
          </ul>
          <BookDetail bookId={selected}/>
          </>
    );
  }
  
export default BookList;
  