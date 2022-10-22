import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { client } from "../../../config/environment";

const InitialName = {
  name: "",
  areaId: "",
  groupId: "",
};

const AddProcessDialog = ({
  visible,
  setVisible,
  refetch,
  groups,
  areas,
  actual,
  setActual,
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
    setActual();
  };

  const createProcess = async () => {
    try {
      await client.post("process", process);
      refetch();
      closeDialog();
    } catch (error) {
      console.log("🚀 ~ file: index.jsx ~ line 45 ~ onFinish ~ error", error);
    }
  };

  useEffect(() => {
    if (actual !== undefined) {
      setProcess({
        ...process,
        areaId: String(actual?.area),
        groupId: String(actual?.group),
      });
    }
  }, [visible, actual]);

  return (
    <Dialog open={visible} onClose={closeDialog}>
      <DialogTitle>Crear Proceso</DialogTitle>
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

          <Grid item xs={5}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='demo-simple-select-helper-label'>
                Grupo
              </InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={process.groupId}
                label='Grupos'
                onChange={(event) => {
                  setProcess({ ...process, groupId: event.target.value });
                }}
              >
                {groups.map((g) => (
                  <MenuItem value={String(g?.id)}>{g?.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Grupo</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={5}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='demo-simple-select-helper-label'>
                Areas
              </InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={process.areaId}
                label='Areas'
                onChange={(event) => {
                  setProcess({ ...process, areaId: event.target.value });
                }}
              >
                {areas.map((g) => (
                  <MenuItem value={String(g?.id)}>{g?.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Area</FormHelperText>
            </FormControl>
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
          onClick={createProcess}
          disabled={
            process.name === "" ||
            process.groupId === "" ||
            process.areaId === ""
              ? true
              : false
          }
        >
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProcessDialog;
