import * as React from 'react';
import {Container, Box} from '@mui/material';

import {TopNavBar} from '../components/TopNavBar';
import {BodyContent, BodyContentProps} from '../components/BodyContent';
import {News} from '../components/News';

export interface NewsPageProps {}

export const NewsPage: React.FC<NewsPageProps> = (props: NewsPageProps): React.ReactElement => {
  return (<Container>
    <Box sx={{}}>
      <TopNavBar />
      <BodyContent content={<News />} />
    </Box>
  </Container>);
}
