import * as React from 'react';
import {useEffect, useLayoutEffect} from 'react';
import {Box, Typography, Grid, Paper, Avatar, Skeleton} from '@mui/material';
import {useSelector, useDispatch } from 'react-redux';
import {useNavigate, redirect} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {sagaProfile} from '../redux/saga/profile.js';

export interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = (props: ProfileProps): React.ReactElement => {
  const {t} = useTranslation('components/Profile');
  const dispatch = useDispatch();
  const navigate = useNavigate();
	const profile = useSelector((state) => (state as any).profile.data);
  const loadProfile = useSelector((state) => (state as any).profile.dataLoading);

  const logout = useSelector((state) => (state as any).auth.logout);
  const login = useSelector((state) => (state as any).auth.login);

  useEffect(() => {
    if(login && !logout) {
      dispatch(sagaProfile());
    }
    if(!login && logout) {
      navigate('/');
    }
  }, [login, logout]);

  return (<Box sx={{flexGrow: 1}}>
    <Grid container sx={{mt: 1}} columnSpacing={1}>
      <Grid item xs={12}>
        <Paper sx={{pt: 2, pb: 2, display: 'flex', justifyContent: 'center'}}>
          <Typography variant="h4" sx={{fontWeight: 'bold'}}>
            {t('User Info')}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{mt: 1, pt: 5, pb: 5, display: 'flex', justifyContent: 'center'}}
          >
            {loadProfile?<Skeleton width={100} height={100} variant="circular" animation="wave" />:
            <Avatar
              alt={profile.name}
              sx={{width: 100, height: 100}}
              children= {`${profile.name?.split(' ')[0][0]}${profile.name?.split(' ')[1][0]}`}
            />}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper>
          <Grid container sx={{mt: 1}} spacing={1}>
            <Grid item xs={4}>
              <Typography sx={{pl: 1}} variant="h6" component="div">
                <Paper elevation={0}>{t('Name')}</Paper>
              </Typography>
            </Grid>
            <Grid item xs={8} sx={{display: 'flex', alignItems: 'center'}}>
              {loadProfile?<Skeleton sx={{width: '80%', fontSize: '2rem'}} variant="text" animation="wave" />:
              <Paper elevation={0}>{profile.name}</Paper>}
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{pl: 1}} variant="h6" component="div">
                <Paper elevation={0}>{t('Username')}</Paper>
              </Typography>
            </Grid>
            <Grid item xs={8} sx={{display: 'flex', alignItems: 'center'}}>
              {loadProfile?<Skeleton sx={{width: '80%', fontSize: '2rem'}} variant="text" animation="wave" />:
              <Paper elevation={0}>{profile.username}</Paper>}
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{pl: 1}} variant="h6" component="div">
                <Paper elevation={0}>{t('Email')}</Paper>
              </Typography>
            </Grid>
            <Grid item xs={8} sx={{display: 'flex', alignItems: 'center'}}>
              {loadProfile?<Skeleton sx={{width: '80%', fontSize: '2rem'}} variant="text" animation="wave" />:
              <Paper elevation={0}>{profile.email}</Paper>}
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{pl: 1}} variant="h6" component="div">
                <Paper elevation={0}>{t('Phone')}</Paper>
              </Typography>
            </Grid>
            <Grid item xs={8} sx={{display: 'flex', alignItems: 'center'}}>
              {loadProfile?<Skeleton sx={{width: '80%', fontSize: '2rem'}} variant="text" animation="wave" />:
              <Paper elevation={0}>{profile.phone}</Paper>}
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{pl: 1}} variant="h6" component="div">
                <Paper elevation={0}>{t('Website')}</Paper>
              </Typography>
            </Grid>
            <Grid item xs={8} sx={{display: 'flex', alignItems: 'center'}}>
              {loadProfile?<Skeleton sx={{width: '80%', fontSize: '2rem'}} variant="text" animation="wave" />:
              <Paper elevation={0}>{profile.website}</Paper>}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Grid container sx={{mt: 1}} spacing={1}>
            <Grid item xs={12}>
              <Typography sx={{pt: 1, pb: 1, pl: 3}} variant="h5" component="div">
                <Paper elevation={0}>{t('Address')}</Paper>
              </Typography>
              <hr />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{pl: 1}} variant="h6" component="div">
                <Paper elevation={0}>{t('City')}</Paper>
              </Typography>
            </Grid>
            <Grid item xs={8} sx={{display: 'flex', alignItems: 'center'}}>
              {loadProfile?<Skeleton sx={{width: '80%', fontSize: '2rem'}} variant="text" animation="wave" />:
              <Paper elevation={0}>{profile.address?.city}</Paper>}
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{pl: 1}} variant="h6" component="div">
                <Paper elevation={0}>{t('Street')}</Paper>
              </Typography>
            </Grid>
            <Grid item xs={8} sx={{display: 'flex', alignItems: 'center'}}>
              {loadProfile?<Skeleton sx={{width: '80%', fontSize: '2rem'}} variant="text" animation="wave" />:
              <Paper elevation={0}>{profile.address?.street}</Paper>}
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{pl: 1}} variant="h6" component="div">
                <Paper elevation={0}>{t('Suite')}</Paper>
              </Typography>
            </Grid>
            <Grid item xs={8} sx={{display: 'flex', alignItems: 'center'}}>
              {loadProfile?<Skeleton sx={{width: '80%', fontSize: '2rem'}} variant="text" animation="wave" />:
              <Paper elevation={0}>{profile.address?.suite}</Paper>}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Grid container sx={{mt: 1}} spacing={1}>
            <Grid item xs={12}>
              <Typography sx={{pt: 1, pb: 1, pl: 3}} variant="h5" component="div">
                <Paper elevation={0}>{t('Company')}</Paper>
              </Typography>
              <hr />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{pl: 1}} variant="h6" component="div">
                <Paper elevation={0}>{t('Title')}</Paper>
              </Typography>
            </Grid>
            <Grid item xs={8} sx={{display: 'flex', alignItems: 'center'}}>
              {loadProfile?<Skeleton sx={{width: '80%', fontSize: '2rem'}} variant="text" animation="wave" />:
              <Paper elevation={0}>{profile.company?.name}</Paper>}
            </Grid>

            <Grid item xs={4}>
              <Typography sx={{pl: 1}} variant="h6" component="div">
                <Paper elevation={0}>{t('Phrase')}</Paper>
              </Typography>
            </Grid>
            <Grid item xs={8} sx={{display: 'flex', alignItems: 'center'}}>
              {loadProfile?<Skeleton sx={{width: '80%', fontSize: '2rem'}} variant="text" animation="wave" />:
              <Paper elevation={0}>{profile.company?.catchPhrase}</Paper>}
            </Grid>

            <Grid item xs={4}>
              <Typography sx={{pl: 1}} variant="h6" component="div">
                <Paper elevation={0}>{t('BS')}</Paper>
              </Typography>
            </Grid>
            <Grid item xs={8} sx={{display: 'flex', alignItems: 'center'}}>
              {loadProfile?<Skeleton sx={{width: '80%', fontSize: '2rem'}} variant="text" animation="wave" />:
              <Paper elevation={0}>{profile.company?.bs}</Paper>}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </Box>);
}
