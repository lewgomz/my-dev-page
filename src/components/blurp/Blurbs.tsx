import { Link } from 'react-router-dom';
import { motion, easeInOut } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { getFeaturedProjects } from '@/services/ProjectService';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeInOut } },
};

export default function Blurbs() {
  const projects = getFeaturedProjects();
  return (
    <motion.div
      className="grid grid-cols-3 gap-2"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={item}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <Link to={`/projects/${project.id}`} className="block h-full">
            <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/40 hover:border-foreground/20 cursor-pointer">
              <img
                src={project.image}
                alt={project.imageLabel}
                className="w-full aspect-square sm:aspect-video object-cover"
              />
              <CardContent className="flex-1 p-2 sm:p-4 space-y-1">
                <h2 className="font-semibold text-xs sm:text-base line-clamp-2">{project.title}</h2>
                <p className="hidden sm:block text-sm text-muted-foreground line-clamp-3">{project.description}</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
