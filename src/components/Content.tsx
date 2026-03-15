import { motion } from 'framer-motion';
import LittleBlurbs from './blurp/LittleBlurbs';
import Box from '@mui/material/Box';
import Blurbs from './blurp/Blurbs';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Content() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3} md={2}>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <Avatar
              alt="Lewis Gomez"
              src="https://avatars.githubusercontent.com/u/105124673?v=4"
              sx={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        </Grid>
        <Grid item xs={9} md={10}>
          <motion.div initial="hidden" animate="show" variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { duration: 0.5, delay: 0.1 } } }}>
            I want to add a bio here or something cool! Idk what to say but this is about me! 🐲
          </motion.div>
        </Grid>
        <Grid item xs={12}>
          <LittleBlurbs />
        </Grid>
        <Grid item xs={12}>
          <Blurbs />
        </Grid>
      </Grid>
    </Box>
  );
}
