import * as React from 'react';
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { BlurbService } from '../../services/BlurbSerivce';
import Grid from '@mui/material/Grid';

export default function LittleBlurb() {
    let params = useParams();
    let blurbId = params.id as string;
    const blurb = new BlurbService().getLittleBurb(blurbId);
    return (
        <Grid container spacing={2}>
            {blurb && <>
                <Grid item xs={12}>
                <Typography variant="h3">
                        {blurb.title}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <img
                        src={`${blurb.image}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${blurb.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={blurb.title}
                        loading="lazy"
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="body1" paragraph>
                        {blurb.description}
                    </Typography>
                </Grid>
                
                
            </>}
        </Grid>
    );
}