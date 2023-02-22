import * as React from 'react';
import {Box, Typography, Grid, Paper, Skeleton, Fab, Button} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {Add as AddIcon, Save as SaveIcon} from '@mui/icons-material';
import {useTranslation} from "react-i18next";

export interface NewsMoreProps {
  moreLoading: boolean;
  disabled: boolean;
  moreFn: () => void
}

export const NewsMore: React.FC<NewsMoreProps> = (props: NewsMoreProps): React.ReactElement => {
  const {t} = useTranslation('components/NewsMore');
  return (<Paper sx={{display: 'flex', justifyContent: 'center', pb: 3, pt: 3, m: 1}}>
    {props.moreLoading?<LoadingButton loading
                                      size="large"
                                      loadingPosition="start"
                                      startIcon={<SaveIcon />}
                                      sx={{minWidth: '75%'}}
                                      variant="outlined">
      {t('Loading...')}
    </LoadingButton>:<Button variant="contained"
                             size="large"
                             onClick={props.moreFn}
                             disabled={props.disabled || false}
                             sx={{minWidth: '75%'}}>
      {t('More News')}
    </Button>}
  </Paper>);
}
