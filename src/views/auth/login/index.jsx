import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "./../../../providers/session";
import { client } from "../../../config/environment";

const Login = () => {
  const { setIsLogged } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await client.post("/login", {
        emailUsername: data.get("email"),
        password: data.get("password"),
        expires: false,
      });
      setIsLogged(true);
    } catch (error) {}
  };

  return (
    <Box>
      <Container component='main' maxWidth='xs'>
        <Box mt={"25%"}>
          <Paper elevation={24} sx={{ p: 2, borderRadius: "0.5rem" }}>
            <Box
              sx={{
                backgroundColor: "gray",
                borderRadius: "0.5rem",
                marginTop: -5,
                color: "white",
                boxShadow: 12,
                padding: 4,
              }}
            >
              <Typography align='center' variant='h4' gutterBottom>
                <b>Log In</b>
              </Typography>
              <Typography align='center' gutterBottom>
                Introduce tus datos para iniciar sesión
              </Typography>
            </Box>
            <Box
              component='form'
              onSubmit={null}
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
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Recordar usuario'
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
