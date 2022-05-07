import * as React from 'react';
import LittleBlurbs from './blurp/LittleBlurbs';
import Blurbs from './blurp/Blurbs';
import Box from '@mui/material/Box';

export default function Content() {

  return (
    <>
        <Box>
            I want to add a bio here or something cool!
        </Box>
        <LittleBlurbs/>
        <Blurbs />
    </>
  );
}