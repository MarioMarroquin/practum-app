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

const EditGroupDialog = ({
  visible,
  setVisible,
  refetch,
  groupToEdit,
  setGroupToEdit,
}) => {
  const [group, setGroup] = useState(InitialName);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setGroup({
      ...group,
      [name]: value,
    });
  };

  const closeDialog = () => {
    setVisible(false);
    refetch();
    setGroup(InitialName);
    setGroupToEdit();
  };

  const editGroup = async () => {
    try {
      await client.put(`groups/${groupToEdit.id}`, group);
      refetch();
      closeDialog();
    } catch (error) {
      console.log("🚀 ~ file: index.jsx ~ line 45 ~ onFinish ~ error", error);
    }
  };

  useEffect(() => {
    if (visible === true) {
      setGroup({ ...group, name: groupToEdit.name });
    }
  }, [visible, groupToEdit]);

  return (
    <Dialog open={visible} onClose={closeDialog}>
      <DialogTitle>Editar grupo</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='caption' display='block' gutterBottom>
              Nombre de Grupo:
            </Typography>
            <TextField
              id='name'
              name='name'
              type='text'
              required
              value={group.name}
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
          onClick={editGroup}
          disabled={group.name === "" ? true : false}
        >
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditGroupDialog;
