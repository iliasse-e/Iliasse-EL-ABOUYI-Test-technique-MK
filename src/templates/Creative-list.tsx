import {
    Avatar,
    Chip,
    Grid,
    List,
    ListItem,
    ListItemText,
    Pagination,
    Paper,
    Switch,
    Typography,
  } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Creative } from "type";
import { DetailPreview } from "components/detail-preview";
import { getPaginatedCreatives, updateCreative } from "service/api";
import { useMutation } from "react-query";
  
/**
 * Displays the list of all creatives available
 */
export const CreativeList: React.FC<{creatives: Creative[]}> = ({ creatives }): JSX.Element => {

  const [adds, setAdds] = useState<Creative[]>(creatives)
  const itemsPerPage = 5;
  const [page, setPage] = useState<number>(1);
  const [noOfPages] = useState<number>(
    Math.ceil(creatives.length / itemsPerPage)
  );
  const [selectedDetail, setSelectedDetail] = useState<Creative>(adds[0])
  console.log(adds.indexOf(selectedDetail))
  
  
  const toggleEnabled = useMutation((newData: Creative) => {
    console.log(newData.enabled)
    return updateCreative(newData.id, newData)
  })
  
  const handlePagination = (event: any, value: React.SetStateAction<number>) => {
    setPage(value)
  }

  useEffect(() => {
    getPaginatedCreatives(page, itemsPerPage)
    .then(res => setAdds(res))
  }, [page])

  return (
    <Grid container style={{ marginTop: 16, marginBottom: 16 }} spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Paper style={{ padding: 16 }} elevation={8}>
          <List>
            {adds
            .map((creative: Creative, index: number) => (
              <ListItem
                secondaryAction={<Switch checked={creative.enabled} onChange={() => {
                  toggleEnabled.mutate({
                  id: creative.id,
                  createdBy: creative.createdBy,
                  contributors: creative.contributors,
                  lastModified: creative.lastModified,
                  enabled: !creative.enabled,
                  title: creative.title,
                  description: creative.description,
                  content: creative.content,
                  formats: creative.formats
                }, {onSuccess: () => {
                  getPaginatedCreatives(page, itemsPerPage)
                  .then(res => setAdds(res));
                }})
              }} />}
                divider={index < adds.length - 1}
              >
                <ListItemText
                  primary={
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Typography
                          variant="h6"
                          style={{
                            ...(adds[index] === selectedDetail ? { fontWeight: "bold" } : {}),
                            cursor:'pointer',
                          }}
                          onClick={() => setSelectedDetail(creative)}
                        >
                          {creative.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <div style={{ display: "flex" }}>
                          { creative.contributors && creative.contributors.map((user) => (
                            <Avatar key={user.id} style={{ marginLeft: -16 }}>
                              {user.firstName.charAt(0) + " " + user.lastName.charAt(0)}
                            </Avatar>
                          ))}
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        {creative.formats && creative.formats.map((format) => (
                          <Chip
                            style={{ marginRight: 8 }}
                            key={format.height + "x" + format.width}
                            label={format.height + "x" + format.width}
                          />
                        ))}
                      </Grid>
                    </Grid>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid item>
            <Pagination
            count={noOfPages}
            page={page}
            onChange={handlePagination}
            defaultPage={1} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={2} />
      <DetailPreview creative={selectedDetail} />            

    </Grid>
  );
}

