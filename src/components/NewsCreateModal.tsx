import * as React from 'react';
import {useRef, useEffect} from 'react';
import {Container, Box, Typography, Grid, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText,
        IconButton, Button, TextField, Alert, AlertTitle, Skeleton, Tooltip} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {Close as CloseIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import {LoadingButton} from '@mui/lab';
import {Save as SaveIcon} from '@mui/icons-material';
import {useTranslation} from "react-i18next";

import * as Yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {sagaNewNews} from '../redux/saga/news.js';
import {errorNewNews as errorNewNewsAC} from '../redux/news.js';


export interface NewsCreateModalProps {
  title: string;
  onClose?: () => void;
  onSuccess?: (o: any) => void;
}

const validationSchemaModal = Yup.object().shape({
	title: Yup.string().required('Title is required')
						.min(3, 'Title must be minimum 3 characters')
						.max(255, 'Title must be maximum 255 characters'),
	body: Yup.string().required('Body is required')
								.min(10, 'Body must be at least 10 characters')
								.max(3000, 'Body must be maximum 3000 characters')
});

export const NewsCreateModal: React.FC<NewsCreateModalProps> = (props: NewsCreateModalProps): React.ReactElement => {
  const {t} = useTranslation('components/NewsCreateModal');
  const {register, handleSubmit, setValue, control, formState: {errors}} = useForm({resolver: yupResolver(validationSchemaModal)});
  const dispatch = useDispatch();

  const newNews = useSelector((state) => (state as any).news.newData);
	const loadNewNews = useSelector((state) => (state as any).news.dataNewLoading);
	const errorNewNews = useSelector((state) => (state as any).news.errorNewData);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const formRef = useRef(null);

  const countRender = useRef(0);
	useEffect(() => {
		countRender.current++;
		if(typeof props.onSuccess === 'function' && countRender.current > 1) {
			props.onSuccess.call(null, newNews);
		}
	}, [newNews]);

	useEffect(() => () => {dispatch(errorNewNewsAC(false))}, []);

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

  return (<Dialog open={true}
                  fullScreen={fullScreen}
                  fullWidth={true}
                  onClose={!loadNewNews?props.onClose:undefined}
                  maxWidth={'sm'}>
    <DialogTitle>
      <Typography variant="h6" component="div">
        {props.title}
      </Typography>
      <Tooltip title={t('Close Dialog')} arrow={true}>
        <IconButton aria-label="close"
                    color="error"
                    size="large"
                    onClick={props.onClose}
                    disabled={loadNewNews}
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
      <Box component="form" ref={formRef} onSubmit={handleSubmit((data) => {
        console.log(data);
        dispatch(sagaNewNews(data));
      })}>
        <Grid container>
          {errorNewNews?<Grid item xs={12} sx={{pt: 2}}>
            <Alert severity="error" onClose={() => dispatch(errorNewNewsAC(false))}>
              <AlertTitle>{t('Server Error Create News')}</AlertTitle>
              <Typography>{errorNewNews.data.reason || errorNewNews.data.message}</Typography>
            </Alert>
          </Grid>:null}
          <Grid item xs={12} sx={{pt: 2, pb: 2}}>
            <Controller
              control={control}
              name="title"
              render={({ field, fieldState: {error}}) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  label={t('Title News')}
                  disabled={loadNewNews}
                  error={!!errors.title}
                  helperText={<Typography sx={{fontWeight: 'bold'}}>{t(errors.title?.message as string)}</Typography>}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{}}>
            <Controller
              control={control}
              name="body"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="text"
                  fullWidth
                  variant="outlined"
                  label={t('Text News')}
                  multiline
                  rows={5}
                  disabled={loadNewNews}
                  error={!!errors.body}
                  helperText={<Typography sx={{fontWeight: 'bold'}}>{t(errors.body?.message as string)}</Typography>}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </DialogContent>
    <DialogActions sx={{display: 'flex', justifyContent: 'center', pb: 3}}>
      <Button variant="outlined" color="error" size="large" onClick={props.onClose} disabled={loadNewNews}>
        <Typography sx={{fontWeight: 'bold'}}>
          {t('Close')}
        </Typography>
      </Button>
      {!loadNewNews?<Button variant="contained" color="success" size="large" onClick={() => (formRef.current as any).requestSubmit()}>
        <Typography sx={{fontWeight: 'bold'}}>
          {t('Create News')}
        </Typography>
      </Button>:<LoadingButton loading
                               size="large"
                               loadingPosition="start"
                               startIcon={<SaveIcon />}
                               variant="outlined">
        <Typography sx={{fontWeight: 'bold'}}>
          {t('Creating News...')}
        </Typography>
      </LoadingButton>}
    </DialogActions>
  </Dialog>);
}
