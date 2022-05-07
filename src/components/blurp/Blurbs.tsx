import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { BlurbService } from 'src/services/BlurbSerivce';

export default function LittleBlurbs() {
  const blurbs = new BlurbService().getAllBlurbs();
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {blurbs.map((blurb) => (
              <Grid item key={blurb.title} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
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
            ))}
          </Grid>
        </Container>
  );
}