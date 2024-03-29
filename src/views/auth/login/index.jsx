import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { client } from "../../../config/environment";
import { useSession } from "../../../providers/session";

const Login = () => {
  const { setIsLogged } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await client.post("auth/login", {
        email: data.get("email"),
        password: data.get("password"),
      });
      setIsLogged(true);
    } catch (error) {
      console.log(
        "🚀 ~ file: index.jsx ~ line 29 ~ handleSubmit ~ error",
        error
      );
    }
  };

  return (
    <Box>
      <Container component='main' maxWidth='xs'>
        <Box mt={"25%"}>
          <Paper elevation={24} sx={{ p: 2, borderRadius: "0.5rem" }}>
            <Box
              sx={{
                backgroundColor: "#566573",
                borderRadius: "0.5rem",
                marginTop: -5,
                color: "white",
                boxShadow: 12,
                padding: 4,
              }}
            >
              <Typography align='center' variant='h4' gutterBottom>
                <b>Iniciar Sesión</b>
              </Typography>
              <Typography align='center' gutterBottom>
                Introduce tus credenciales
              </Typography>
            </Box>
            <Box
              component='form'
              onSubmit={handleSubmit}
              mt={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <TextField
                margin='normal'
                variant='filled'
                required
                fullWidth
                name='email'
                id='email'
                label='Correo electrónico'
                autoComplete='email'
              />
              <TextField
                margin='normal'
                variant='filled'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
              />
              <Button
                type='submit'
                variant='contained'
                sx={{ mt: 3, mb: 4, mx: "auto" }}
              >
                Iniciar Sesión
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
