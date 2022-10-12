import React , {useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from '../Queries/query';

function AddNewBook() {

    const [bookDetail, setBookDetail] = useState({
        name:"",
        genre:"",
        author:"",
    });
    const [addBook] = useMutation(ADD_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
      });

    const inputHandler = (e) =>{
        setBookDetail({
           ...bookDetail,[e.target.name]:e.target.value
        })
    }

    const formSubmit = () => {
        let name = document.book_form.name.value;
        let genre = document.book_form.genre.value;
        let author = document.book_form.author.value;
        if( name === null || name === ""){
            alert("Name field needs to be filled.")
        } if( genre === null || genre === ""){
            alert("Genre field needs to be filled.")
        } if( author === null || author === ""){
            console.log(author)
            alert("author field needs to be filled.")
        }else{
        console.log(bookDetail, "after book submit");
        addBook({
            variables:bookDetail
        })
    }
    }


    const { loading, error, data } =  useQuery(GET_AUTHORS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data) 
    return(
        <>
            <form name="book_form" id="add-book">
                <div className='field' style={{padding:"10px"}}>
                    <label>Book Name:</label>
                    <input type="text" name='name' id="name" onChange={inputHandler} value={bookDetail.name}/>
                </div>
                <div className='field' style={{padding:"10px"}}>
                    <label>Genre:</label>
                    <input type="text" name='genre' id="genre" onChange={inputHandler} value={bookDetail.genre}/>
                </div>
                <div className='field' style={{padding:"10px"}}>
                <label>Author:</label>
                <select name='author' id="author" onChange={inputHandler} value={bookDetail.author}>
                    <option selected="none" value="">Select Author</option>
                    {data.authors.map(author=>{
                        return <>
                        <option key={author?.id} >
                            {author.name}
                        </option>
                        </>
                    })}
                </select>
                </div>
                <div className='field' style={{padding:"10px"}}>
                 <button type="button" value="Submit" onClick={formSubmit}>+</button>
                </div>
            </form>
        </>
    )
}
  
export default AddNewBook;
  