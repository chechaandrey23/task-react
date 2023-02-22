import * as React from 'react';
import {useRef, useEffect, useCallback} from 'react';
import {Container, Box, Typography, Grid, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText,
        IconButton, Button, TextField, Alert, AlertTitle, Skeleton, Tooltip} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {Close as CloseIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from "react-i18next";

import {sagaRemoveNews} from '../redux/saga/news.js';

export interface NewsDeleteModalProps {
  title: string;
  id: number;
  onClose?: () => void;
}

export const NewsDeleteModal: React.FC<NewsDeleteModalProps> = (props: NewsDeleteModalProps): React.ReactElement => {
  const {t} = useTranslation('components/NewsDeleteModal');
  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOKClose = useCallback(() => {
		dispatch(sagaRemoveNews({id: props.id}));
		props.onClose?.call(null);
	}, [props]);

  return (<Dialog open={true}
                  fullScreen={fullScreen}
                  fullWidth={true}
                  onClose={props.onClose}
                  maxWidth={'sm'}>
    <DialogTitle>
      <Typography variant="h6" component="div">
        {props.title}
      </Typography>
      <Tooltip title={t('Close Dialog')} arrow={true}>
        <IconButton aria-label="close"
                    color="secondary"
                    size="large"
                    onClick={props.onClose}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8
                    }}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </DialogTitle>
    <DialogContent sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Grid container>
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
          <Alert severity="warning" sx={{pt: 3, pb: 3, width: '100%'}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', ml: 3}} component="div">
              {t('Are you sure you want to delete news id: {}?', {id: props.id})}
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions sx={{display: 'flex', justifyContent: 'center', pb: 3}}>
      <Button variant="outlined" color="secondary" size="large" onClick={props.onClose}>
        <Typography sx={{fontWeight: 'bold'}}>
          {t('Close')}
        </Typography>
      </Button>
      <Button variant="contained" color="error" size="large" onClick={handleOKClose}>
        <Typography sx={{fontWeight: 'bold'}}>
          {t('Delete News')}
        </Typography>
      </Button>
    </DialogActions>
  </Dialog>);
}
