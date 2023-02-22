import * as React from 'react';
import {Container, Box, Typography} from '@mui/material';

import {TopNavBar} from '../components/TopNavBar';
import {BodyContent, BodyContentProps} from '../components/BodyContent';
import {ErrorFC} from '../components/Error';

export interface ErrorPageProps {}

export const ErrorPage: React.FC<ErrorPageProps> = (props: ErrorPageProps): React.ReactElement => {
  return (<Container>
    <Box sx={{}}>
      <TopNavBar />
      <BodyContent content={<ErrorFC />} />
    </Box>
  </Container>);
}
