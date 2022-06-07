import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Creative } from '../../type'
import { Add } from '@mui/icons-material';

interface FormatFormDialogProps {
  formats : Creative["formats"],
  setFormats: React.Dispatch<React.SetStateAction<Creative["formats"]>>
}

// Adds a new format to creative
export const FormatFormDialog: React.FC<FormatFormDialogProps> = ({ formats, setFormats }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [width, setWidth] = React.useState<number>(0)
  const [height, setHeight] = React.useState<number>(0)

  const handleSubmit = () => {
    const currentFormats = formats;
    currentFormats.push({ width: width, height: height })
    setFormats(new Array(...currentFormats))
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Add />
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <form onSubmit={(e) => { 
          e.preventDefault()
          handleSubmit()
          }}>
          <DialogTitle>Créer un nouveau format</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Veuillez entrer de nouvelles dimensions
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="largeur"
              type="number"
              fullWidth
              variant="standard"
              value={width}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setWidth(parseInt(e.target.value))}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="longueur"
              type="number"
              fullWidth
              variant="standard"
              value={height}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
                setHeight(parseInt(e.target.value))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button onClick={handleClose} type="submit">Nouveau format</Button>
          </DialogActions>

        </form>
      </Dialog>
    </div>
  );
}
