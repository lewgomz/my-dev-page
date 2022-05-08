import * as React from 'react';
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { BlurbService } from '../../services/BlurbSerivce';

export default function LittleBlurb() {
    let params = useParams();
    let blurbId = params.id as string;
    const blurb = new BlurbService().getLittleBurb(blurbId);
    return (
        <Box sx={{ flexGrow: 1, pb: 10 }}>
            <Grid container spacing={2}>
                {blurb && <>
                    <Grid item key={blurb.title} xs={12} sm={6} md={4}>
                        <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                        <CardMedia
                            component="img"
                            image={blurb.image}
                            alt={blurb.title}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {blurb.title}
                            </Typography>
                            <Typography>
                            {blurb.description}
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                </>}
            </Grid>
        </Box>
    );
}