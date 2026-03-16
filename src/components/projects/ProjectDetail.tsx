import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { motion, easeInOut } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getProject } from '@/services/ProjectService';
import { TimelineEntries } from '@/data/TimelineConfigs';
import DiagramRenderer from './DiagramRenderer';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easeInOut, delay },
});

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProject(id ?? '');
  const [activeTab, setActiveTab] = useState<'overview' | 'diagram'>('overview');

  if (!project) {
    return (
      <div className="w-[92%] mx-auto text-center py-16 text-muted-foreground">
        Project not found.
      </div>
    );
  }

  const timelineEntry = TimelineEntries.find((e) => e.id === project.timelineEntryId);

  return (
    <div className="w-[92%] mx-auto space-y-4">
      {/* Back */}
      <motion.div {...fadeUp(0)}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </motion.div>

      {/* Header — title/meta left, timeline footnote right */}
      <motion.div {...fadeUp(0.05)}>
        <div className="flex items-start justify-between gap-4">
          {/* Left: title, subtitle, date */}
          <div className="space-y-1 flex-1 min-w-0">
            <h1 className="text-3xl font-bold tracking-tight leading-tight">{project.title}</h1>
            <p className="text-base text-muted-foreground">{project.subtitle}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>
                {new Date(project.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
            </div>
          </div>

          {/* Right: timeline footnote */}
          {timelineEntry && (
            <div className="text-right shrink-0 space-y-0.5 pt-1 border-l border-border pl-4">
              <p className="text-xs font-medium text-foreground/70">{timelineEntry.role}</p>
              <p className="text-xs text-muted-foreground">{timelineEntry.period}</p>
            </div>
          )}
        </div>

        {/* Tags — in header, below title block */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs cursor-default select-none transition-all duration-150 border-sky-500/30 text-sky-500 hover:text-sm hover:px-3 hover:py-1 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-[0_0_10px_rgba(14,165,233,0.4)]"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.08)}>
        <Separator />
      </motion.div>

      {/* Mobile tabs */}
      <motion.div {...fadeUp(0.1)} className="flex md:hidden gap-2">
        {(['overview', 'diagram'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
              activeTab === tab
                ? 'bg-sky-500 text-white'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Description */}
      <motion.div
        {...fadeUp(0.12)}
        className={activeTab === 'diagram' ? 'hidden md:block' : 'block'}
      >
        <p className="text-base leading-relaxed text-foreground/90">{project.description}</p>
      </motion.div>

      {/* Diagram */}
      <motion.div
        {...fadeUp(0.18)}
        className={`space-y-2 ${activeTab === 'overview' ? 'hidden md:block' : 'block'}`}
      >
        <p className="text-[10px] text-muted-foreground/60 italic">
          Simplified architecture pattern based on systems I worked on. Details have been generalized and do not represent the exact company architecture.
        </p>
        <DiagramRenderer
          nodes={project.diagram.nodes}
          edges={project.diagram.edges}
          className="h-[340px] md:h-[500px]"
        />
      </motion.div>

      {/* Results */}
      <motion.div
        {...fadeUp(0.24)}
        className={activeTab === 'diagram' ? 'hidden md:block' : 'block'}
      >
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          Results
        </h2>
        <ul className="space-y-1.5">
          {project.results.map((r) => (
            <li key={r} className="text-sm text-foreground/80 flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
              {r}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
