import * as React from 'react';
import {Container, Box} from '@mui/material';

import {TopNavBar} from '../components/TopNavBar';
import {BodyContent, BodyContentProps} from '../components/BodyContent';
import {Auth} from '../components/Auth';

export interface AuthPageProps {}

export const AuthPage: React.FC<AuthPageProps> = (props: AuthPageProps): React.ReactElement => {
  return (<Container>
    <Box sx={{}}>
      <TopNavBar />
      <BodyContent content={<Auth />} />
    </Box>
  </Container>);
}
