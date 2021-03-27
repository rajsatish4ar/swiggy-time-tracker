import {ApolloClient, InMemoryCache} from '@apollo/client';
import {randomColors} from '@utils/Colors';
import {QRAPHQL_URL} from '@utils/URLs';
export const graphql_client = new ApolloClient({
  uri: QRAPHQL_URL,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1xTFFXMDlNTUxRMUNNZGJpV3cwSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTEyODI0ODY2NTMxODQ1OTQzOTQ2In0sImdpdmVuX25hbWUiOiJTYXRpc2giLCJmYW1pbHlfbmFtZSI6IlJhamJoYXIiLCJuaWNrbmFtZSI6InNhdGlzc3JhaiIsIm5hbWUiOiJTYXRpc2ggUmFqYmhhciIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaXhvSkFNbFljbUJSOXZoZlJWM3BvSmlyaWxscFdEdlBwcy1PTjEwZz1zOTYtYyIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMjEtMDMtMjdUMDk6NTk6MjguMzcxWiIsImlzcyI6Imh0dHBzOi8vdGVzdC0zMjMudXMuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEyODI0ODY2NTMxODQ1OTQzOTQ2IiwiYXVkIjoiTXJVUzNzWUxKVFNaWjMyaVIzeDlIcEFidzM5VlVSVWgiLCJpYXQiOjE2MTY4MzkxNjgsImV4cCI6MTYxNjg3NTE2OCwiYXRfaGFzaCI6IkdneTFaS1hQNjBSclk4WHYwSXdPbXciLCJub25jZSI6InBDVGNiZHZzZHpDZ2hsWk9uWWw1ajZTTEc3SXYwNTJjIn0.0IzlsCeoEf65IxyoVJHLyy8ehbBKtP9aCbE176pSRwUfkrnMuUUkU6MXORKr2hNDxi8QGfrY8Ecle3ih5MNe-rieYLshPW5CQGUPYejJvvFXXSlJ60hD6aKwFQPf4SY4bMG3zDI00raPKT7QgMBO8Ef_5AnqximsPhcJ6kawtiVOdiPTbnD6tZojZucx1j_xh-kzwANKF4T-beFqF4adi-woySIrDyiKAH57aJguMJqGVh48is785ebd9BspZUOXSC0b0s2lmT5FDwwLyyKOYzOAkBdQaF-1Xbry01Kx2McqURcmmG-vQIrTUVg-oaMnf1U9ulS9fmN3cTnYnWgqgA',
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
