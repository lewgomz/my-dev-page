import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { BlurbService } from '../../services/BlurbService';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function LittleBlurbs() {
  const blurbs = new BlurbService().getAllBlurbs();
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4} component={motion.div} variants={container} initial="hidden" animate="show">
        {blurbs.map((blurb) => (
          <Grid item key={blurb.title} xs={12} sm={6} md={4} component={motion.div} variants={item}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{ pt: '56.25%' }}
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
