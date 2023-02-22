import * as React from 'react';
import {Grid, Box, Typography, Paper, Fab, Card, CardContent, CardActions, CardHeader, Skeleton} from '@mui/material';
import {Delete as DeleteIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';

export interface NewsItemSkeletonProps {
  key: number;
}

export const NewsItemSkeleton: React.FC<NewsItemSkeletonProps> = (props: NewsItemSkeletonProps): React.ReactElement => {
  const dispatch = useDispatch();
  const logout = useSelector((state) => (state as any).auth.logout);
  const login = useSelector((state) => (state as any).auth.login);

  return (<Card key={props.key} sx={{maxWidth: '100%', mb: 1, mr: 1, ml: 1}}>
    <CardContent>
        <Grid container>
          <Grid item xs={10} sx={{display: 'flex', justifyContent: 'start'}}>
              <Skeleton sx={{width: '100%', fontSize: '1.5rem'}} variant="text" animation="wave" />
          </Grid>
          {(login && !logout)?<Grid item xs={2} sx={{display: 'flex', justifyContent: 'end'}}>
            <Paper elevation={0} sx={{p: 1}}>
              <Fab disabled color="error" size="medium" aria-label="delete">
                <DeleteIcon />
              </Fab>
            </Paper>
          </Grid>:null}
        </Grid>
    </CardContent>
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        <Skeleton sx={{width: '100%', fontSize: '1rem'}} variant="text" animation="wave" />
        <Skeleton sx={{width: '100%', fontSize: '1rem'}} variant="text" animation="wave" />
        <Skeleton sx={{width: '100%', fontSize: '1rem'}} variant="text" animation="wave" />
      </Typography>
    </CardContent>
    <CardContent>
      <Typography variant="body1">
        <Grid container>
          <Grid item xs={6} sx={{display: 'flex', justifyContent: 'end'}}>
            <Skeleton sx={{width: '40%', fontSize: '2rem'}} variant="text" animation="wave" />
          </Grid>
          <Grid item xs={6} sx={{display: 'flex', justifyContent: 'end'}}>
            <Skeleton sx={{width: '35%', fontSize: '2rem'}} variant="text" animation="wave" />
          </Grid>
        </Grid>
      </Typography>
    </CardContent>
  </Card>);
}
