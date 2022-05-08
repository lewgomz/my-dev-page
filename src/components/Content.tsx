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
              sx={{ width: 120, height: 120 }}
            />
          </Grid>
          <Grid item xs={10}>
              I want to add a bio here or something cool! Idk what to say but this is about me! 🐲
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