import * as React from 'react';
import LittleBlurbs from './blurp/LittleBlurbs';
import Blurbs from './blurp/Blurbs';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

export default function Content() {

  return (
    <>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Avatar alt="Lewis Gomez" src="https://avatars.githubusercontent.com/u/105124673?v=4"
              sx={{ width: 260, height: 260 }} />
          </Grid>
          <Grid item xs={10}>
              I want to add a bio here or something cool!
          </Grid>
          <Grid item xs={12}>
            <LittleBlurbs />
          </Grid>
          <Grid item xs={12}>
          <Blurbs />
          </Grid>
        </Grid>
    </>
  );
}