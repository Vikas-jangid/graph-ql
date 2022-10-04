import React from 'react';
import BookList from './Components/BookList';
import AddNewBook from './Components/AddBook';

import { ApolloClient, InMemoryCache, ApolloProvider, } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client} >
      <div className="App">
        <BookList />
        <AddNewBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
