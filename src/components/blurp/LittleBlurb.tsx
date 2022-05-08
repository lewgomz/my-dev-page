import * as React from 'react';
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { BlurbService } from '../../services/BlurbSerivce';

export default function LittleBlurb() {
    let params = useParams();
    let blurbId = params.id as string;
    const blurb = new BlurbService().getLittleBurb(blurbId);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {blurb && <>
                    <Grid item xs={12}>
                    <Typography variant="h3">
                            {blurb.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={5} md={4}>
                        <img
                            src={`${blurb.image}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${blurb.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={blurb.title}
                            loading="lazy"
                        />
                    </Grid>
                    <Grid item xs={7} md={6}>
                        <Typography variant="body1" paragraph>
                            {blurb.description}
                        </Typography>
                    </Grid>
                </>}
            </Grid>
        </Box>
    );
}