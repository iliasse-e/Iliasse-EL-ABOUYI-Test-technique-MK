import {
    Button,
    Chip,
    Grid,
    IconButton,
    Paper,
    Switch,
    TextField,
  } from "@mui/material";
import { useState } from "react";
import { Creative } from "type";
import { FormatFormDialog } from "components/dialogs/format-form-dialog";
import { useMutation, UseMutationResult } from "react-query";
import { deleteCreative, updateCreative } from "service/api";
import { Link, Navigate } from "react-router-dom";
import { AlertDialog } from "components/dialogs/alert-dialog";
import { HOME } from "routes/routes";

/**
 * Displays the detail of a selected creative and allows the user to modify and delete it
 */
export const Detail: React.FC<{data: Creative}> = ({data}): JSX.Element => {
 
  const [title, setTitle] = useState<string>(data.title)
  const [content, setContent] = useState<string>(data.content)
  const [description, setDescription] = useState<string>(data.description)
  const [enabled, toggleEnabled] = useState<boolean>(data.enabled)
  const [formats, setFormats] = useState<Creative["formats"]>(data.formats)

  const saveCreative: UseMutationResult<any, unknown, unknown, unknown> = useMutation((newData: Creative) => {
    return updateCreative(data.id, newData)
  })

  const eraseCreative: UseMutationResult<any, unknown, unknown, unknown> = useMutation(() => {
    return deleteCreative(data.id)
  })

  if (saveCreative.isSuccess || eraseCreative.isSuccess) {
    return <Navigate to={HOME} />
  }

  return (
    <Grid container style={{ marginTop: 16, marginBottom: 16 }} spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8}>
      </Grid>

      <Grid item xs={2} />

      <Grid item xs={3} />
      <Grid item xs={6}>
        <Paper elevation={8} style={{ padding: 16 }}>
          <Grid container alignItems="center">
            <Grid item xs={8}>
              <TextField
                margin="normal"
                label="Titre"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
                  setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs container justifyContent="flex-end">
              <Grid item>
                <Switch checked={enabled} onChange={() => 
                  toggleEnabled(!enabled)} />
              </Grid>
            </Grid>
          </Grid>

          <TextField
            margin="normal"
            fullWidth
            multiline
            minRows={3}
            label="Description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
              setDescription(e.target.value)}
          />

          <TextField
            margin="normal"
            fullWidth
            multiline
            minRows={10}
            label="Contenu"
            value={content}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
              setContent(e.target.value)}
          />

          <Grid container spacing={2} alignItems="center">
            {formats.map((format: { width: number; height: number; }) => (
              <Grid key={format.width + "x" + format.height} item>
                <Chip 
                label={format.width + "x" + format.height} 
                color="primary" 
                onDelete={() => setFormats(formats.filter(element => element !== format))} />
              </Grid>
            ))}
            <Grid item>
              <IconButton size="small" color="primary">
                <FormatFormDialog formats={formats} setFormats={setFormats} />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={3} />

      <Grid item xs={3} />
      <Grid item xs={6} container spacing={3} justifyContent="center">
        <Grid item>
          <Button color="primary" variant="contained" onClick={() => saveCreative.mutate({
            id: data.id,
            createdBy: data.createdBy,
            contributors: data.contributors,
            lastModified: new Date(Date.now()),
            enabled: enabled,
            title: title,
            description: description,
            content: content,
            formats: formats
            })}>
            Sauvegarder
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">
              <Link to={HOME}>
                Annuler
              </Link>
            </Button>
        </Grid>
        <Grid item>
            <AlertDialog action={eraseCreative.mutate} />
        </Grid>
      </Grid>
    </Grid>
  );
}
