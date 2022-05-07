import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { BlurbService } from 'src/services/BlurbSerivce';

export default function LittleBlurbs() {
  const littleBlurbs = new BlurbService().getAllLittleBlurbs();
  return (
    <Grid container spacing={4}>
        {littleBlurbs.map((blurp) => (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a" href={"/my-dev-page/post/" + blurp.id }>
                <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                    {blurp.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                    {blurp.date}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                    {blurp.description.substring(0,20)}...
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                    Continue reading...
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                    image={blurp.image}
                    alt={blurp.imageLabel}
                />
                </Card>
            </CardActionArea>
        </Grid>
        ))}
    </Grid>
  );
}