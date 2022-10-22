import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { client } from "../../../config/environment";

const InitialName = {
  name: "",
};

const EditProcessDialog = ({
  visible,
  setVisible,
  refetch,
  processToEdit,
  setProcessToEdit,
}) => {
  const [process, setProcess] = useState(InitialName);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProcess({
      ...process,
      [name]: value,
    });
  };

  const closeDialog = () => {
    setVisible(false);
    refetch();
    setProcess(InitialName);
    setProcessToEdit();
  };

  const editArea = async () => {
    try {
      await client.put(`process/${processToEdit.id}`, process);
      refetch();
      closeDialog();
    } catch (error) {
      console.log("🚀 ~ file: index.jsx ~ line 45 ~ onFinish ~ error", error);
    }
  };

  useEffect(() => {
    if (visible === true) {
      setProcess({ ...process, name: processToEdit.name });
    }
  }, [visible, processToEdit]);

  return (
    <Dialog open={visible} onClose={closeDialog}>
      <DialogTitle>Editar proceso</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='caption' display='block' gutterBottom>
              Nombre de Proceso:
            </Typography>
            <TextField
              id='name'
              name='name'
              type='text'
              required
              value={process.name}
              onChange={handleInputChange}
              fullWidth
              size='small'
              margin='dense'
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color='error' variant='contained' onClick={closeDialog}>
          Cancelar
        </Button>
        <Button
          color='success'
          variant='contained'
          onClick={editArea}
          disabled={
            process.name === "" ||
            process.groupId === "" ||
            process.areaId === ""
              ? true
              : false
          }
        >
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProcessDialog;
