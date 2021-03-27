import {ApolloClient, InMemoryCache} from '@apollo/client';
import {randomColors} from '@utils/Colors';
import {QRAPHQL_URL} from '@utils/URLs';
export const graphql_client = new ApolloClient({
  uri: QRAPHQL_URL,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1xTFFXMDlNTUxRMUNNZGJpV3cwSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTEyODI0ODY2NTMxODQ1OTQzOTQ2In0sImdpdmVuX25hbWUiOiJTYXRpc2giLCJmYW1pbHlfbmFtZSI6IlJhamJoYXIiLCJuaWNrbmFtZSI6InNhdGlzc3JhaiIsIm5hbWUiOiJTYXRpc2ggUmFqYmhhciIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaXhvSkFNbFljbUJSOXZoZlJWM3BvSmlyaWxscFdEdlBwcy1PTjEwZz1zOTYtYyIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMjEtMDMtMjdUMDE6NDk6NDkuNzUwWiIsImlzcyI6Imh0dHBzOi8vdGVzdC0zMjMudXMuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEyODI0ODY2NTMxODQ1OTQzOTQ2IiwiYXVkIjoiTXJVUzNzWUxKVFNaWjMyaVIzeDlIcEFidzM5VlVSVWgiLCJpYXQiOjE2MTY4MDk3OTAsImV4cCI6MTYxNjg0NTc5MCwiYXRfaGFzaCI6IlRrbm85UU9IOGJjaUpLQWRreXBIbVEiLCJub25jZSI6IkFZVmtoSGxId0FBU35xZlFPYjJaYkRfUjFHaW5HanNGIn0.dKhS6wFYu0AlpNv7wclSdfzIjogJ00andJ4rPztC10K4RbT8_LWakAgsIMXc_QhP1rLYGfFO8JhocRAFEm6gvbG2oNcAZqkot8ct2O83MYz_k08SdX6C26l9CsmuFo6ruOE66TdpA0r6dH60seV4u6l3R7WEBHH777tbpOsm-YdZ7lQaELGGEqa2D5VnG0WnOBkiJpq8E3fh1oKITMDgn3Q7U3UVIrkiW1ZDNEVzRg-vNeVA7wnOC5Ig9revAf-i6_KnCC27pwb0FyYyWKC_K8w7-8U4_O0nv5U-0PxPvH24io8h5gA4-FFjRpUFLYZgWqbtJY-6pzdMIdOQVCLU9A',
  },
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export const LOGO = require('@assets/img/logo.png');

export const getRandomColor = (i: number = 0): string => {
  const range = i % randomColors.length;
  return randomColors[range];
};
