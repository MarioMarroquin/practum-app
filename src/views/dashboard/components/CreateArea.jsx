import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Snackbar,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { client } from "../../../../config/environment";
  
  const InitialArea = {
    name: "",
  };
  
  const CreateArea = ({ visible, setVisible }) => {
    const [newArea, setNewArea] = useState(InitialArea);
  
    const [alert, setAlert] = useState(false);
  
    const handleClick = () => {
      setAlert(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setAlert(false);
    };
  
    const resetStates = () => {
      setNewArea(InitialArea);
    };
  
    const closeDialog = () => {
      setVisible(false);
      resetStates();
    };
  
    const handleInputChange = (e) => {
      const { name } = e.target;
  
      setNewArea({
        ...newArea,
      });
    };
  
    const onFinish = async () => {
      try {
        await client.post("area", newArea);
        closeDialog();
      } catch (error) {
        console.log("🚀 ~ file: index.jsx ~ line 45 ~ onFinish ~ error", error);
        handleClick();
      }
    };
  
    return (
      <>
        <Snackbar open={alert} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: "100%" }}>
            Error al crear!
          </Alert>
        </Snackbar>
        <Dialog open={visible} onClose={closeDialog}>
          <DialogTitle>Anadir Area</DialogTitle>
          <DialogContent>
              <Grid item xs>
                <Typography variant='caption' display='block' gutterBottom>
                  Nombre:
                </Typography>
                <TextField
                  id='name'
                  name='name'
                  type='name'
                  required
                  value={newArea.name}
                  onChange={handleInputChange}
                  fullWidth
                  size='small'
                  margin='dense'
                />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color='error' variant='contained' onClick={closeDialog}>
              Cancelar
            </Button>
            <Button color='success' variant='contained' onClick={onFinish}>
              Crear
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  
  export default CreateArea;
  