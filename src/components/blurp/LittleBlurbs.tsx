import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { BlurbService } from '../../services/BlurbService';
import { Link } from 'react-router-dom';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function LittleBlurbs() {
  const littleBlurbs = new BlurbService().getAllLittleBlurbs();
  return (
    <Grid container spacing={4} component={motion.div} variants={container} initial="hidden" animate="show">
        {littleBlurbs.map((blurp) => (
        <Grid item key={blurp.id} xs={12} md={6} component={motion.div} variants={item}>
            <CardActionArea component={Link} to={"/my-dev-page/post/" + blurp.id }>
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
