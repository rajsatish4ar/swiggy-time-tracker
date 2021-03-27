import {ApolloClient, InMemoryCache} from '@apollo/client';
import {randomColors} from '@utils/Colors';
import {QRAPHQL_URL} from '@utils/URLs';
export const graphql_client = new ApolloClient({
  uri: QRAPHQL_URL,
  cache: new InMemoryCache(),
});

export const LOGO = require('@assets/img/logo.png');

export const getRandomColor = (i: number = 0): string => {
  const range = i % randomColors.length;
  return randomColors[range];
};
