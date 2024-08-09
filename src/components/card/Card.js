import React from "react";
import { Box, Flex } from "@chakra-ui/react";

export const Card = ({ children, ...props }) => {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      p={4}
      borderWidth="1px"
      borderColor="gray.200"
      {...props}
    >
      {children}
    </Box>
  );
};

export const CardHeader = ({ children, ...props }) => (
  <Flex
    as="header"
    alignItems="center"
    justifyContent="space-between"
    mb={4}
    {...props}
  >
    {children}
  </Flex>
);

export const CardBody = ({ children, ...props }) => (
  <Box as="section" mb={4} {...props}>
    {children}
  </Box>
);

export const CardFooter = ({ children, ...props }) => (
  <Box as="footer" mt={4} {...props}>
    {children}
  </Box>
);

export default Card;
