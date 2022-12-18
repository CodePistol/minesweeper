import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../layout";
import { Provider } from "react-redux";
import { store } from "../app/store";
function MyApp({ Component }: AppProps) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Layout>
          <Component />
        </Layout>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
