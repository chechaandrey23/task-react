import * as React from 'react';
import {Container, Grid, Box, Typography, Paper} from '@mui/material';
import {useLocation, useMatches} from "react-router-dom";
import {useTranslation} from "react-i18next";

export interface ErrorProps {}

export const ErrorFC: React.FC<ErrorProps> = (props: ErrorProps): React.ReactElement => {
  const {t} = useTranslation('components/Error');
  const location = useLocation();
  return (<Box sx={{flexGrow: 1}}>
    <Paper component="div" sx={{mt: 1, minHeight: 'calc(100vh - 60px - 8px - 8px - 8px)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Grid container>
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{mt:5, mb: 5, fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {t('Oops!')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6"sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {t('The page')} "<Typography variant="h6" color='error' sx={{fontWeight: 'bold'}}>{location.pathname}</Typography>" {t('you’re looking for doesn’t exist.')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </Box>);
}
