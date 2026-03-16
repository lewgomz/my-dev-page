import { motion } from 'framer-motion';
import ProjectCard from './projects/ProjectCard';
import { getProjectsForEntry } from '@/services/ProjectService';
import { TimelineEntries } from '@/data/TimelineConfigs';

export default function Timeline() {
  return (
    <div className="relative border-l-2 border-sky-500 pl-6 space-y-5">
      {TimelineEntries.map((entry) => {
        const projects = getProjectsForEntry(entry.id);
        return (
          <motion.div
            key={entry.id}
            className="group relative rounded-lg p-3 -ml-3 cursor-default transition-colors duration-200 hover:bg-sky-500/[0.06] hover:border hover:border-sky-500/20 border border-transparent"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.018 }}
            style={{ originX: 0, originY: 0.5 }}
          >
            <span className="absolute -left-[1.65rem] top-4 h-3 w-3 rounded-full bg-sky-500 ring-2 ring-background z-10 transition-all duration-200 group-hover:h-3.5 group-hover:w-3.5 group-hover:ring-sky-400/40 group-hover:-left-[1.75rem]" />
            <div className="relative space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
                <h3 className="font-semibold text-sm transition-colors duration-150 group-hover:text-sky-400">{entry.role}</h3>
                <span className="text-xs text-muted-foreground transition-colors duration-150 group-hover:text-foreground/60">{entry.period}</span>
              </div>
              <p className="text-xs font-medium text-sky-500">{entry.company}</p>
              <ul className="space-y-1 mt-2">
                {entry.highlights.map((h) => (
                  <li key={h} className="text-sm text-muted-foreground flex gap-2 transition-colors duration-150 group-hover:text-foreground/70">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0 group-hover:bg-sky-500/60 transition-colors duration-150" />
                    {h}
                  </li>
                ))}
              </ul>

              {projects.length > 0 && (
                <div className="mt-3">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                    Projects
                  </p>
                  <div
                    className="flex flex-row gap-3 overflow-x-auto pb-1"
                    style={{ scrollSnapType: 'x mandatory' }}
                  >
                    {projects.map((p) => (
                      <ProjectCard key={p.id} project={p} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
