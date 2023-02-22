import * as React from 'react';
import {Box, Typography, Grid, Paper, Skeleton, Fab, Button, Tooltip} from '@mui/material';
import {useTranslation} from "react-i18next";

export interface HomeProps {}

export const Home: React.FC<HomeProps> = (props: HomeProps): React.ReactElement => {
  const {t} = useTranslation('components/Home');
  return (<Box sx={{flexGrow: 1}}>
    <Paper component="div" sx={{mt: 1, minHeight: 'calc(100vh - 60px - 8px - 8px - 8px)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Grid container>
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{mt:5, mb: 5, fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {t('Home Page')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6"sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {t('Front-end test task with using React')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </Box>);
}
