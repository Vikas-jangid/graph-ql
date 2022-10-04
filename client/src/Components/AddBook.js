import React , {useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, ADD_BOOK } from '../Queries/query';

function AddNewBook() {

    const [bookDetail, setBookDetail] = useState({
        name:"",
        genre:"",
        author:"",
    });
    const [addBook] = useMutation(ADD_BOOK)

    const inpurHandler = (e) =>{
        setBookDetail({
           ...bookDetail,[e.target.name]:e.target.value
        })
        console.log(bookDetail)
    }

    const formSubmit = () => {
        console.log(bookDetail, "after book submit");
        addBook({
            variables:bookDetail
        })
    }


    const { loading, error, data } =  useQuery(GET_AUTHORS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data) 
    return(
        <>
            <form id="add-book">
                <div className='field' style={{padding:"10px"}}>
                    <label>Book Name:</label>
                    <input type="text" name='name' onChange={inpurHandler} value={bookDetail.name}/>
                </div>
                <div className='field' style={{padding:"10px"}}>
                    <label>Genre:</label>
                    <input type="text" name='genre' onChange={inpurHandler} value={bookDetail.genre}/>
                </div>
                <div className='field' style={{padding:"10px"}}>
                <label>Author:</label>
                <select name='author' onChange={inpurHandler} value={bookDetail.author}>
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
                 <button type="button" value="Submit" onClick={formSubmit}>Add Book</button>
                </div>
            </form>
        </>
    )
}
  
export default AddNewBook;
  