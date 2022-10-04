import  {gql} from '@apollo/client';
// import bookDetail from "../Components/AddBook.js"

export const GET_AUTHORS = gql` 
query GetAuthors {
  authors{
    name,
    age
    id
  }
}`

export const ADD_BOOK = gql`
mutation addBook($name:String!, $genre:String!, $author:String!) {
  addBook(name:$name, genre:$genre, author:$author){
    name,
    genre,
    author{
      name
    }
  }
}
`

export const GET_BOOKS = gql` 
query GetBooks {
  books{
    name,
    genre,
  }
}
`