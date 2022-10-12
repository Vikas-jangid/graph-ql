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

export const GET_BOOK = gql`
query GetBook($id:ID){
  book(id:$id){
    id,
    name,
    genre,
    author{
      name,
      age,
      books{
        name,
        id
      }
    }
  }

}
`

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

export const DELETE_BOOK = gql`
mutation deleteBook($id:ID!){
  book(id:$id){
    id,
    name,
    genre
  }
}
`

export const GET_BOOKS = gql` 
query GetBooks {
  books{
    id
    name,
    genre,
  }
}
`