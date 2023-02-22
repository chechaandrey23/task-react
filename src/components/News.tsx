import * as React from 'react';
import {useEffect, useCallback, useRef, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Box, Typography, Grid, Paper, Skeleton, Fab, Button, Tooltip} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {Add as AddIcon, Save as SaveIcon} from '@mui/icons-material';
import {useSelector, useDispatch}  from 'react-redux';
import {Routes, Route, Link, useParams, useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {sagaGetNews, sagaMoreNews} from '../redux/saga/news.js';

import {NewsItem} from './NewsItem';
import {NewsItemSkeleton} from './NewsItemSkeleton';
import {NewsMore} from './NewsMore';
import {NewsCreateModal} from './NewsCreateModal';

export interface NewsProps {}

export const News: React.FC<NewsProps> = (props: NewsProps): React.ReactElement => {
  const {t} = useTranslation('components/News');
  const news = useSelector((state) => (state as any).news.data);
	const newsLoading = useSelector((state) => (state as any).news.dataLoading);
	const newsMoreLoading = useSelector((state) => (state as any).news.dataMoreLoading);
  const newsDeleting = useSelector((state) => (state as any).news.dataProcessing);
	const paginator = useSelector((state) => (state as any).news.paginator);
	const dispatch = useDispatch();

  const logout = useSelector((state) => (state as any).auth.logout);
  const login = useSelector((state) => (state as any).auth.login);

  const [searchParams] = useSearchParams();

	useEffect(() => {
		dispatch(sagaGetNews({params: new URLSearchParams(
      searchParams.toString()+'&_page=1&_limit='+paginator.getDefaultCountRows()
    )}));
	}, [searchParams]);

  const moreFn = useCallback(() => {
		dispatch(sagaMoreNews({params: new URLSearchParams(
      searchParams.toString()+'&_page='+paginator.getPageForQuery()+'&_limit='+paginator.getDefaultCountRows()
    )}));
	}, [searchParams]);

  const refFirst = useRef(false);
  useEffect(() => {
    refFirst.current = true;
  }, []);

  const [showModalCreateNews, setShowModalCreateNews] = useState(false);

  return (<Box sx={{flexGrow: 1}}>
    <Grid container sx={{mt: 0}} spacing={1}>
      <Grid item xs={(login && !logout)?9:12} sm={(login && !logout)?10:12}>
        <Paper sx={{pl: 3, pt: 2, pb: 2}}>
          <Typography variant="h4" sx={{fontWeight: 'bold'}}>
            {t('News')}
          </Typography>
        </Paper>
      </Grid>
      {(login && !logout)?<Grid item xs={3} sm={2}>
        <Paper sx={{display: 'flex', justifyContent: 'center', pt: 1.2, pb: 2}}>
          <Tooltip title={t('Create News')} arrow={true}>
            <Fab color="success" size="medium" aria-label="add" onClick={() => {setShowModalCreateNews(true)}}>
              <AddIcon />
            </Fab>
          </Tooltip>
        </Paper>
        {showModalCreateNews?<NewsCreateModal title={t('Modal Create News')}
												                      onClose={() => {setShowModalCreateNews(false)}}
												                      onSuccess={(newObj) => {
													                      setShowModalCreateNews(false);
                                              }} />:null}
      </Grid>:null}
      <Grid item xs={12}>
        <Paper sx={{mt: 0, pt: 1}}>
          <InfiniteScroll dataLength={news.length}
                          next={moreFn}
                          scrollThreshold={0.99}
                          loader={<NewsMore moreLoading={newsMoreLoading || newsLoading} moreFn={moreFn} disabled={!refFirst.current} />}
                          endMessage={<NewsMore moreLoading={newsMoreLoading || newsLoading} moreFn={moreFn} disabled={!refFirst.current} />}
                          hasMore={(() => {
                            if(newsLoading || !refFirst.current) return false;
                            return paginator.hasMore();
                          })()}>
                          {newsLoading || !refFirst.current?[0,1,2,3,4,5,6,7,8,9].map((entry: any) => {
                            return <NewsItemSkeleton key={entry} />
                          }):news.map((entry: any) => {
                            if(newsDeleting.findIndex((el: any) => el.id == entry.id) > -1) {
                              return <NewsItemSkeleton key={entry.id} />
                            } else {
                              return <NewsItem  key={entry.id}
                                                id={entry.id}
                                                userId={entry.userId}
                                                title={entry.title}
                                                body={entry.body}/>
                            }
                          })}
          </InfiniteScroll>
        </Paper>
      </Grid>
    </Grid>
  </Box>);
}
