import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { ProjectConfig } from './ProjectConfigs';

interface ProjectCardProps {
  project: ProjectConfig;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="block shrink-0 w-48 scroll-snap-align-start cursor-pointer"
      style={{ scrollSnapAlign: 'start' }}
    >
      <motion.div
        className="h-full rounded-lg border border-border bg-card p-3 space-y-1.5 border-l-2 border-l-sky-500/40 transition-colors duration-150"
        whileHover={{
          y: -3,
          scale: 1.03,
          transition: { duration: 0.18, ease: 'easeInOut' },
        }}
        style={{ cursor: 'pointer' }}
      >
        <motion.div
          className="rounded-md"
          whileHover={{ backgroundColor: 'rgba(14,165,233,0.06)' }}
          transition={{ duration: 0.15 }}
        >
          <p className="text-sm font-semibold leading-tight line-clamp-1 text-foreground">
            {project.title}
          </p>
          <p className="text-xs text-muted-foreground leading-tight line-clamp-1 mt-0.5">
            {project.subtitle}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {project.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] px-1.5 py-0 h-4 border-sky-500/30 text-sky-500"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}
