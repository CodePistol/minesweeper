import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../layout";

function MyApp({ Component }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
