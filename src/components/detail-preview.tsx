import {
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
  } from "@mui/material";
  import { Person } from "@mui/icons-material";
import React from "react";
import { Creative } from "type";
import moment from "moment";
import 'moment/locale/fr'
import { Link } from "react-router-dom";
import { HOME } from "routes/routes";

// Renders detail of selected creative
export const DetailPreview: React.FC<{creative: Creative}> = ({ creative }) => {
    const createdDate = moment(creative.lastModified)

    return (
        <Grid item xs={8}>
        <Paper style={{ padding: 16 }} elevation={8}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Typography variant="h6" paragraph>
              <Link to={`${HOME}/${creative.id}`} style={{ textDecoration: 'none' }} >
                {creative.title}
              </Link>
              </Typography>
              <Typography paragraph>{creative.description}</Typography>
              <Typography paragraph>{creative.content}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={0} style={{ padding: 16 }}>
                <Typography paragraph variant="subtitle2">
                  Créé par {creative.createdBy.firstName} {creative.createdBy.lastName}
                </Typography>
                <Typography paragraph variant="subtitle2">
                  Dernière modification le {createdDate.locale('fr').format("DD MMMM YYYY")}
                </Typography>
              </Paper>

              <Paper elevation={2}>
                <List>
                    {creative.contributors
                    .map((user, idx: number) => (
                    <ListItem key={idx}>
                    <ListItemIcon>
                    <Person />
                    </ListItemIcon>
                    <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                    </ListItem>
                    ))          
                    }
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
}