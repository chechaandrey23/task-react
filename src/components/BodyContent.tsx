import * as React from 'react';
import {Container, Box} from '@mui/material';

export interface BodyContentProps {
  content?: React.ReactElement;
}

export const BodyContent: React.FC<BodyContentProps> = (props: BodyContentProps): React.ReactElement => {
  return (<Box sx={{}}>
    {props.content?props.content:null}
  </Box>);
}
