import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { BlurbService } from '../../services/BlurbService';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function Blurbs() {
  const blurbs = new BlurbService().getAllBlurbs();
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {blurbs.map((blurb) => (
        <motion.div
          key={blurb.title}
          variants={item}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/40 hover:border-foreground/20">
            <img
              src={blurb.image}
              alt={blurb.title}
              className="w-full aspect-video object-cover"
            />
            <CardContent className="flex-1 p-4 space-y-2">
              <h2 className="font-semibold text-base">{blurb.title}</h2>
              <p className="text-sm text-muted-foreground">{blurb.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
