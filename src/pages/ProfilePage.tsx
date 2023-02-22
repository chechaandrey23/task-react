import * as React from 'react';
import {Container, Box} from '@mui/material';

import {TopNavBar} from '../components/TopNavBar';
import {BodyContent, BodyContentProps} from '../components/BodyContent';
import {Profile} from '../components/Profile';

export interface ProfilePageProps {}

export const ProfilePage: React.FC<ProfilePageProps> = (props: ProfilePageProps): React.ReactElement => {
  return (<Container>
    <Box sx={{}}>
      <TopNavBar />
      <BodyContent content={<Profile />} />
    </Box>
  </Container>);
}
