import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const Register = () => {
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
                <b>Crea tu cuenta</b>
              </Typography>
              <Typography align='center' gutterBottom>
                Introduce tus datos para registrar tu cuenta
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
                name='nombre'
                label='Nombre'
                type='nombre'
                id='nombre'
              />
              <TextField
                margin='normal'
                variant='filled'
                required
                fullWidth
                name='apellido'
                label='Apellido'
                type='apellido'
                id='apellido'
              />
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
              <div>
                <Button
                  color= 'grey'
                  type='submit'
                  variant='contained'
                  sx={{ mt: 3, mb: 4, mx: 3 }}
                >
                  Cancelar
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{ mt: 3, mb: 4, mx: 3 }}
                >
                  Crear cuenta
                </Button>
              </div>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
