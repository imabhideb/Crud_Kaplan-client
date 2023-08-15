import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './Components/ApolloClient';
import Navbar from './Components/Navbar';
import { GetBug } from './Components/BugComponent';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navbar/>
        <GetBug/>
      </div>
    </ApolloProvider>
  );
}

export default App;
