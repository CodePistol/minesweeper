import { Box } from "@chakra-ui/layout";
import { ReactElement } from "react";

interface LayoutProps {
  children: ReactElement;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      w="100vw"
      h="100vh"
      bgGradient="radial( green.200, pink.500)"
      pos="fixed"
    >
      {children}
    </Box>
  );
};

export default Layout;
