import { motion, easeInOut } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { BlurbService } from '../../services/BlurbService';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeInOut } },
};

export default function LittleBlurbs() {
  const littleBlurbs = new BlurbService().getAllLittleBlurbs();
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {littleBlurbs.map((blurp) => (
        <motion.div
          key={blurp.id}
          className="h-full"
          variants={item}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <Link to={'/post/' + blurp.id} className="block group h-full">
            <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/40 hover:border-foreground/20">
              <CardContent className="p-4 h-full flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="space-y-0.5 flex-1">
                    <h2 className="font-semibold text-base leading-snug">{blurp.title}</h2>
                    <p className="text-xs text-muted-foreground">
                      {new Date(blurp.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </p>
                  </div>
                  <img
                    src={blurp.image}
                    alt={blurp.imageLabel}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {blurp.description.substring(0, 200)}...
                </p>
                <p className="text-xs font-medium text-sky-500 group-hover:underline mt-3">
                  Continue reading...
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
