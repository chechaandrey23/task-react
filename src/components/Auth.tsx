import * as React from 'react';
import {useRef, useEffect, useState} from 'react';
import {Container, Box, Typography, Grid, Paper,
        IconButton, InputAdornment, OutlinedInput, FormHelperText, FormControl, InputLabel,
        Button, TextField, Alert, AlertTitle, Skeleton} from '@mui/material';
import {Close as CloseIcon, VisibilityOff, Visibility} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {LoadingButton} from '@mui/lab';
import {Save as SaveIcon} from '@mui/icons-material';
import {useTranslation} from "react-i18next";

import * as Yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {errorLogin, login as loginAC} from '../redux/auth.js';
import {sagaLogin} from '../redux/saga/auth.js';

export interface AuthProps {}

const validationSchemaModal = Yup.object().shape({
  username: Yup.string().required('Username is required')
		                    .min(5, 'Username must be at least 5 characters')
		                    .max(20, 'Username must not exceed 20 characters'),
	password: Yup.string().required('Password is required')
		                    .min(5, 'Password must be at least 5 characters')
		                    .max(40, 'Password must not exceed 40 characters')
});

export const Auth: React.FC<AuthProps> = (props: AuthProps): React.ReactElement => {
  const {t} = useTranslation('components/Auth');
  const navigate = useNavigate();
	const dispatch = useDispatch();
	const error = useSelector((state) => (state as any).auth.errorLogin);
	const login = useSelector((state) => (state as any).auth.login);
  const loadLogin = useSelector((state) => (state as any).auth.loadLogin);

  const {register, handleSubmit, setValue, reset, control, formState: {errors}} = useForm({resolver: yupResolver(validationSchemaModal)});

  const formRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {e.preventDefault();};

  useEffect(() => {
		if(login) {
			navigate('/profile');
			//dispatch(loginAC(false));
		}
	}, [login]);

  useEffect(() => () => {dispatch(errorLogin(false))}, [login]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        (formRef.current as any).requestSubmit();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (<Box sx={{flexGrow: 1}}>
      <Paper sx={{mt: 1, minHeight: 'calc(100vh - 60px - 8px - 8px - 8px)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Container fixed={false} maxWidth='sm' sx={{mt: 3, mb: 3, ml: 1, mr: 1}}>
          <Paper sx={{p: 3}}>
            <Grid container sx={{}} columnSpacing={1}>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
              <Typography variant="h4">
                <span>{t('Authorization')}</span>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box component="form" ref={formRef} onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(sagaLogin(data));
              })}>
                <Grid container>
                  {error?<Grid item xs={12} sx={{pt: 2}}>
                    <Alert severity="error" onClose={() => dispatch(errorLogin(false))}>
                      <AlertTitle>{t('Server Error Default Authorization')}</AlertTitle>
                      <Typography>
                        <span>{t(error.data.reason || error.data.message)}</span>
                      </Typography>
                    </Alert>
                  </Grid>:null}
                  <Grid item xs={12} sx={{pt: 2, pb: 2}}>
                    <Controller
                      control={control}
                      name="username"
                      render={({ field, fieldState: {error}}) => (
                        <FormControl sx={{}} variant="outlined" fullWidth={true} disabled={loadLogin?true:false}>
                          <InputLabel htmlFor="adornment-username"
                                      sx={{backgroundColor: 'white', borderRadius: '4px', pl: 1, pr: 1}}
                                      error={!!errors.username}>{t('Username')}</InputLabel>
                          <OutlinedInput
                            {...field}
                            id="adornment-username"
                            autoComplete="off"
                            error={!!errors.username}
                            aria-describedby="username-helper-text"
                          />
                          <FormHelperText id="username-helper-text" error={!!errors.username}>
                            <Typography sx={{fontWeight: 'bold'}}>{t(errors.username?.message as string)}</Typography>
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{pb: 2}}>
                    <Controller
                      control={control}
                      name="password"
                      render={({ field, fieldState: { error } }) => (
                        <FormControl sx={{}} variant="outlined" fullWidth={true} disabled={loadLogin?true:false}>
                          <InputLabel htmlFor="adornment-password"
                                      sx={{backgroundColor: 'white', borderRadius: '4px', pl: 1, pr: 1}}
                                      error={!!errors.password}>{t('Password')}</InputLabel>
                          <OutlinedInput
                            {...field}
                            id="adornment-password"
                            autoComplete="new-password"
                            type={showPassword?'text':'password'}
                            error={!!errors.password}
                            aria-describedby="password-helper-text"
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            color={!!errors.password?'error':'inherit'}
                                            edge="end">
                                  {showPassword?<VisibilityOff />:<Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <FormHelperText id="password-helper-text" error={!!errors.password}>
                            <Typography sx={{fontWeight: 'bold'}}>{t(errors.password?.message as string)}</Typography>
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{display: 'flex', justifyContent: 'end'}}>
              <Button variant="outlined" color="secondary" size="large" onClick={() => {
                reset({
                  username: '',
                  password: ''
                });
                dispatch(errorLogin(false));
              }} disabled={loadLogin?true:false}>
                <Typography sx={{fontWeight: 'bold'}}>
                  {t('Reset')}
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6} sx={{display: 'flex', justifyContent: 'start'}}>
              {!loadLogin?<Button variant="contained" color="success" size="large" onClick={() => {
                dispatch(errorLogin(false));
                (formRef.current as any).requestSubmit();
              }}>
                <Typography sx={{fontWeight: 'bold'}}>
                  {t('Login')}
                </Typography>
              </Button>:<LoadingButton loading
                                       loadingPosition="start"
                                       startIcon={<SaveIcon />}
                                       variant="outlined">
                <Typography sx={{fontWeight: 'bold'}}>
                  {t('Logining...')}
                </Typography>
              </LoadingButton>}
            </Grid>
            </Grid>
          </Paper>
        </Container>
      </Paper>
  </Box>);
}
