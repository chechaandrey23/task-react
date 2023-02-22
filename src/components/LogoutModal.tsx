import * as React from 'react';
import {useRef, useEffect, useCallback} from 'react';
import {Container, Box, Typography, Grid, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText,
        IconButton, Button, TextField, Alert, AlertTitle, Skeleton, Tooltip} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {Close as CloseIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import {LoadingButton} from '@mui/lab';
import {Save as SaveIcon} from '@mui/icons-material';
import {useTranslation} from "react-i18next";

import {sagaLogout} from '../redux/saga/auth.js';
import {logout as logoutAC} from '../redux/auth.js';

export interface LogoutModalProps {
  title: string;
  onClose?: () => void;
  onSuccess?: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = (props: LogoutModalProps): React.ReactElement => {
  const {t} = useTranslation('components/LogoutModal');
  const dispatch = useDispatch();

  const errorLogout = useSelector((state) => (state as any).auth.errorLogout);
	const logout = useSelector((state) => (state as any).auth.logout);
  const loadLogout = useSelector((state) => (state as any).auth.loadLogout);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOKClose = useCallback(() => {
		dispatch(sagaLogout());
	}, []);

	useEffect(() => {
    if(logout) {
      props.onSuccess?.call(null);
      //dispatch(logoutAC(false));
    }
	}, [logout]);

  return (<Dialog open={true}
                  fullScreen={fullScreen}
                  fullWidth={true}
                  onClose={!loadLogout?props.onClose:undefined}
                  maxWidth={'sm'}>
    <DialogTitle>
      <Typography variant="h6" component="div">
        {props.title}
      </Typography>
      <Tooltip title={t('Close Dialog')} arrow={true}>
        <IconButton aria-label="close"
                    color="secondary"
                    size="large"
                    disabled={loadLogout}
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
          <Alert severity="info" sx={{pt: 3, pb: 3, width: '100%'}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', ml: 3}} component="div">
              {t('Are you sure you want to leave the admin area of ​​the site?')} {t('Most of the functionality will be unavailable!')}
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions sx={{display: 'flex', justifyContent: 'center', pb: 3}}>
      <Button variant="outlined" color="secondary" size="large" onClick={props.onClose} disabled={loadLogout}>
        <Typography sx={{fontWeight: 'bold'}}>
          {t('Close')}
        </Typography>
      </Button>
      {!loadLogout?<Button variant="contained" color="info" size="large" onClick={handleOKClose}>
        <Typography sx={{fontWeight: 'bold'}}>
          {t('Logout')}
        </Typography>
      </Button>:<LoadingButton loading
                               size="large"
                               loadingPosition="start"
                               startIcon={<SaveIcon />}
                               variant="outlined">
        <Typography sx={{fontWeight: 'bold'}}>
          {t('Logouting...')}
        </Typography>
      </LoadingButton>}
    </DialogActions>
  </Dialog>);
}
