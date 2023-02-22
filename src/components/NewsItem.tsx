import * as React from 'react';
import {useEffect, useCallback, useRef, useState} from 'react';
import {Grid, Box, Typography, Paper, Fab, Card, CardContent, CardActions, CardHeader, Tooltip} from '@mui/material';
import {Delete as DeleteIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from "react-i18next";

import {NewsDeleteModal} from './NewsDeleteModal';

export interface NewsItemProps {
  userId: number;
  id: number;
  title: string;
  body: string;
  key: number;
}

export const NewsItem: React.FC<NewsItemProps> = (props: NewsItemProps): React.ReactElement => {
  const {t} = useTranslation('components/NewsItem');
  const [showModalDeleteNews, setShowModalDeleteNews] = useState(false);

  const dispatch = useDispatch();
  const logout = useSelector((state) => (state as any).auth.logout);
  const login = useSelector((state) => (state as any).auth.login);

  return (<Card key={props.key} sx={{maxWidth: '100%', mb: 1, mr: 1, ml: 1}}>
    <CardHeader title={props.title} action={(login && !logout)?<Paper elevation={0} sx={{p: 1}}>
      <Tooltip title={t('Delete News')} arrow={true}>
        <Fab color="error" size="medium" aria-label="delete" onClick={() => {setShowModalDeleteNews(true)}}>
          <DeleteIcon />
        </Fab>
      </Tooltip>
      {showModalDeleteNews?<NewsDeleteModal title={t('Modal Confirm Deleting News')}
                                            id={props.id}
                                            onClose={() => {setShowModalDeleteNews(false)}} />:null}
    </Paper>:null} />
    <CardContent>
      <Typography variant="body2" color="text.secondary">{props.body}</Typography>
    </CardContent>
    <CardContent>
      <Typography variant="body1">
        <Grid container>
          <Grid item xs={5} sx={{display: 'flex', justifyContent: 'end'}}><span>{t('Author ID')}:</span></Grid>
          <Grid item xs={1} sx={{display: 'flex', justifyContent: 'start'}}><span>{props.userId}</span></Grid>
          <Grid item xs={5} sx={{display: 'flex', justifyContent: 'end'}}><span>{t('Post ID')}:</span></Grid>
          <Grid item xs={1} sx={{display: 'flex', justifyContent: 'start'}}><span>{props.id}</span></Grid>
        </Grid>
      </Typography>
    </CardContent>
  </Card>);
}
