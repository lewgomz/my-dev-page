import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, easeInOut, Variants } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import HeroSplash from './HeroSplash';
import LittleBlurbs from './blurp/LittleBlurbs';
import Blurbs from './blurp/Blurbs';
import Timeline from './Timeline';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeInOut } },
};

const skillsContainer = {
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const skillItem: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

const initialSkills = [
  'React', 'TypeScript', 'Java', 'Python', 'Ruby',
  'RESTful APIs', 'DynamoDB', 'SNS/SQS', 'EventBridge',
  'Lambda', 'Step Functions', 'AWS CDK', 'API Gateway',
  'CloudFront', 'Route 53', 'S3', 'EC2', 'VPC', 'IAM',
  'RDS', 'Redshift', 'AWS Glue', 'CloudWatch',
  'AWS Bedrock', 'Claude AI',
];

function SortableBadge({ id, isAnyDragging }: { id: string; isAnyDragging: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition: transition ?? 'transform 200ms ease',
        zIndex: isDragging ? 50 : 'auto',
      }}
    >
      <motion.div
        variants={skillItem}
        animate={isDragging ? { opacity: 0.25, scale: 0.9 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.15 }}
        {...attributes}
        {...listeners}
      >
        <Badge
          variant="outline"
          className={`select-none transition-all duration-150
            text-xs hover:text-sm hover:px-3 hover:py-1
            hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-[0_0_10px_rgba(14,165,233,0.4)]
            ${isDragging ? 'cursor-grabbing' : isAnyDragging ? 'cursor-default' : 'cursor-grab'}`}
        >
          {id}
        </Badge>
      </motion.div>
    </div>
  );
}

// Fixed header height (h-14 top bar + h-10 nav row = 96px) + breathing room
// so the section heading clears the header on click-to-jump.
const HEADER_OFFSET_PX = 140;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Content() {
  const [skills, setSkills] = useState(initialSkills);
  const [activeId, setActiveId] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const y = (location.state as { scrollY?: number } | null)?.scrollY;
    if (y) {
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty deps — only run on mount

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSkills((prev) => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = prev.indexOf(over.id as string);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }

  return (
    <>
      {/* Full-bleed cinematic splash */}
      <HeroSplash onJumpToSection={(id) => scrollToSection(id)} />

      <div className="max-w-5xl mx-auto px-4 pt-16">
        <div className="space-y-8">
          {/* About — bio + draggable skills, scroll-triggered */}
          <motion.section
            id="about"
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.15 }}
            variants={sectionVariants}
            className="space-y-4 scroll-mt-24"
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground mb-3">
              About
            </h2>
            <p className="text-sm leading-relaxed">
              I build systems that don't page people at 3am. 11+ years at Amazon shipping distributed infrastructure,
              supply chain tooling, and data pipelines at global scale, and lately building AI-powered products with LLM Models, agentic workflows, and MCP Servers, all leveraging AWS infrastructure.
            </p>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={skills} strategy={rectSortingStrategy}>
                <motion.div className="flex flex-wrap gap-1.5" variants={skillsContainer} initial="hidden" animate="show">
                  {skills.map((skill) => (
                    <SortableBadge key={skill} id={skill} isAnyDragging={activeId !== null} />
                  ))}
                </motion.div>
              </SortableContext>

              <DragOverlay>
                {activeId ? (
                  <Badge
                    variant="outline"
                    className="text-xs cursor-grabbing select-none bg-sky-500 text-white border-sky-500 shadow-[0_0_16px_rgba(14,165,233,0.6)] scale-110"
                  >
                    {activeId}
                  </Badge>
                ) : null}
              </DragOverlay>
            </DndContext>
          </motion.section>

          <Separator />

          {/* Highlights — featured projects, scroll-triggered */}
          <motion.section
            id="highlights"
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            variants={sectionVariants}
            className="scroll-mt-24"
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground mb-3">
              Highlights
            </h2>
            <Blurbs />
          </motion.section>

          <Separator />

          {/* Experience — scroll-triggered */}
          <motion.section
            id="experience"
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.15 }}
            variants={sectionVariants}
            className="scroll-mt-24"
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground mb-3">
              Experience
            </h2>
            <Timeline />
          </motion.section>

          <Separator />

          {/* Posts — scroll-triggered */}
          <motion.section
            id="posts"
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            variants={sectionVariants}
            className="scroll-mt-24"
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground mb-3">
              Posts
            </h2>
            <LittleBlurbs />
          </motion.section>
        </div>
      </div>
    </>
  );
}
