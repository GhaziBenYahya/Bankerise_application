/*import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "store/login/actions";
import { Link as ReactLink } from "react-router-dom";
import { RootState } from 'store/rootReducer';


import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  useColorMode,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import ThemeSelector from "theme/themeSelector";

const SignIn: React.FC = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth);
  console.log("user loading:", loading);
  console.log("user error:", error);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest(username, password));
  };

  return (
    <Box
      bgImage={require("../../../assets/img/bg_sign.png")}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      w="100%"
      h="100vh"
    >
      <Box position="absolute" top={4} right={4}>
        <ThemeSelector />
      </Box>

      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Box
          maxWidth="400px"
          p={8}
          borderWidth={1}
          borderRadius="md"
          boxShadow="md"
          bg="white"
        >
          <Flex justify="center" mb={5}>
            <Image src={require("../../../assets/img/logo.png")} alt="Logo" />
          </Flex>
          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              <Heading
                textAlign="center"
                fontSize="xl"
                color="#4F4787"
                fontWeight="bold"
              >
                Welcome Back!
              </Heading>
              <Input
                size="lg"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                size="lg"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box>
                <Checkbox>Remember Me!</Checkbox>
              </Box>

              <Button
                bg="#67C3D7"
                color={"white"}
                size="lg"
                fontSize="lg"
                type="submit"
                disabled={authLoading}
              >
                {authLoading ? "Logging in..." : "Sign In"}
              </Button>

              <ChakraLink as={ReactLink} to="/forgot-password" textAlign="center">
                Forgot Password?
              </ChakraLink>
            </Stack>
          </form>
          {authError && <div>{authError}</div>}
        </Box>
      </Flex>
    </Box>
  );
};

export default SignIn;
*/
import React, { useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorMode,
  Stack,
  Link,
} from "@chakra-ui/react";
import ThemeSelector from "theme/themeSelector";

function SignIn(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      bgImage={require("../../../assets/img/bg_sign.png")}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      w="100%"
      h="100vh"
    >
      <Box
        position="absolute" // Add position absolute to the theme selector container
        top={4} // Adjust the top position as needed
        right={4} // Adjust the right position as needed
      >
        <ThemeSelector />
      </Box>

      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Box
          maxWidth="400px"
          p={8}
          borderWidth={1}
          borderRadius="md"
          boxShadow="md"
        >
          <Flex justify="center" mb={5}>
            <Image src={require("../../../assets/img/logo.png")} alt="Logo" />
          </Flex>
          <Stack spacing={3}>
            <Heading
              textAlign="center"
              fontSize="xl"
              color="#4F4787"
              fontWeight="bold"
            >
              Welcome Back!
            </Heading>
            <Input size="lg" placeholder="Username" />
            <Input size="lg" type="password" placeholder="Password" />
            <Box>
              <Checkbox>Remember Me!</Checkbox>
            </Box>

            <Button bg="#67C3D7" color={"white"} size="lg" fontSize="lg">
              <ReactLink to="/dashboard">Sign In </ReactLink>
            </Button>

            <Link textAlign="center">Forgot Password?</Link>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default SignIn;
