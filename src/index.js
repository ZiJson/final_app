import { HomeProvider } from './containers/hooks/useHome';
import "./index.css";
// import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient, InMemoryCache, ApolloProvider,
  split, HttpLink
} from '@apollo/client';
import { getMainDefinition } from
  '@apollo/client/utilities';
import { GraphQLWsLink } from
  '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js"
import { WebSocketLink } from "apollo-link-ws";
const url = new URL("/graphql", 'http://52.37.230.229:3100/');
const httpLink = new HttpLink({
  uri: url.href
});
const wsLink = new WebSocketLink({
  // uri: `ws://localhost:5000/graphql`,
  uri: url.href.replace("http", "ws"),
  options: { 
    reconnect: true,
    lazy: true,
   },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache().restore({}),
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HomeProvider><App /></HomeProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
