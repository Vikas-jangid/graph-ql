import React from 'react';
import BookList from './Components/BookList';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client} >
      <div className="App">
        <h1>VIkas jangid</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
