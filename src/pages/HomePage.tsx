import * as React from 'react';
import {Container, Box} from '@mui/material';

import {TopNavBar} from '../components/TopNavBar';
import {BodyContent, BodyContentProps} from '../components/BodyContent';
import {Home} from '../components/Home';

export interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = (props: HomePageProps): React.ReactElement => {
  return (<Container>
    <Box sx={{}}>
      <TopNavBar />
      <BodyContent content={<Home />} />
    </Box>
  </Container>);
}
