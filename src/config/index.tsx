import {ApolloClient, InMemoryCache} from '@apollo/client';
import {randomColors} from '@utils/Colors';
import {QRAPHQL_URL} from '@utils/URLs';
export const graphql_client = new ApolloClient({
  uri: QRAPHQL_URL,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1xTFFXMDlNTUxRMUNNZGJpV3cwSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTEyODI0ODY2NTMxODQ1OTQzOTQ2In0sImdpdmVuX25hbWUiOiJTYXRpc2giLCJmYW1pbHlfbmFtZSI6IlJhamJoYXIiLCJuaWNrbmFtZSI6InNhdGlzc3JhaiIsIm5hbWUiOiJTYXRpc2ggUmFqYmhhciIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaXhvSkFNbFljbUJSOXZoZlJWM3BvSmlyaWxscFdEdlBwcy1PTjEwZz1zOTYtYyIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMjEtMDMtMjhUMTA6MTI6NDYuNzkxWiIsImlzcyI6Imh0dHBzOi8vdGVzdC0zMjMudXMuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEyODI0ODY2NTMxODQ1OTQzOTQ2IiwiYXVkIjoiTXJVUzNzWUxKVFNaWjMyaVIzeDlIcEFidzM5VlVSVWgiLCJpYXQiOjE2MTY5MjYzNjcsImV4cCI6MTYxNjk2MjM2NywiYXRfaGFzaCI6ImxVTHVORmp2SEdqN3RwNldtR1Y2TVEiLCJub25jZSI6IjRTeEdLek5ZU0suWmo1T3RfbnprRlNtS0N0NWhiYy01In0.NRhntFb1RK2N5XIFLrMlqwV7d7wwtpJqgdzT2ImKpk2Chd1cn8IlWDKDP5GfLy8_dHq6EvQ03Nttiv5GIzbDvl11XxC4QUDTU_IsC64BJmmlLpOCuDMu6QJPrNHgo1TFuliX7To4dsrGv4PY9nlCSm5ukAohDyEpoa3s3VXJt2-aCabBXWbwH_d_119AMrVzvST-FhnEgBlnDIr2mGlFeiFFTNJ3Jqn15xxHFCaSmUk81QY3IsICrMW3Q4mO9YbGouZtpf6hZdPia1uXMB7dLhU2YX1haXvoAoGxIhnbcJvpb40EqPIWocp1lI4RNyGDRAGkqu1x6ZTmvcfpAgmPbQ',
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
