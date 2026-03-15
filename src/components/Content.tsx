import { useState } from 'react';
import { motion } from 'framer-motion';
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
import LittleBlurbs from './blurp/LittleBlurbs';
import Blurbs from './blurp/Blurbs';
import Timeline from './Timeline';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const skillsContainer = {
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } },
};

const skillItem = {
  hidden: { opacity: 0, scale: 0.75 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
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
    // Outer div: dnd-kit owns transform + transition for smooth neighbor shifting
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition: transition ?? 'transform 200ms ease',
        zIndex: isDragging ? 50 : 'auto',
      }}
    >
      {/* Inner motion.div: Framer Motion owns visual state only */}
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

export default function Content() {
  const [skills, setSkills] = useState(initialSkills);
  const [activeId, setActiveId] = useState<string | null>(null);

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
    <div className="space-y-8">
      {/* Hero — always animates on mount */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={heroVariants}
        className="space-y-4"
      >
        {/* Avatar + name/title inline */}
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full ring-2 ring-sky-500 ring-offset-2 ring-offset-background shrink-0 overflow-hidden">
            <img
              src="/my-dev-page/lew-avatar.JPG"
              alt="Lewis Gomez"
              className="w-full h-full object-cover"
              style={{ objectPosition: '72% 0%', transform: 'scale(2.7)', transformOrigin: '50% 33%' }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Lewis Gomez</h1>
            <p className="text-muted-foreground text-sm">Senior Software Development Engineer · Amazon</p>
          </div>
        </div>

        {/* Description — full width */}
        <p className="text-sm leading-relaxed">
          I build systems that don't page people at 3am. 11+ years at Amazon shipping distributed infrastructure,
          supply chain tooling, and data pipelines at global scale, and lately building AI-powered products with LLM Models, agentic workflows, and MCP Servers, all leveraging AWS infrastructure.
        </p>

        {/* Skills — draggable */}
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
      </motion.div>

      <Separator />

      {/* Experience — scroll-triggered */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionVariants}
      >
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Experience
        </h2>
        <Timeline />
      </motion.section>

      <Separator />

      {/* Posts — scroll-triggered */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Posts
        </h2>
        <LittleBlurbs />
      </motion.section>

      <Separator />

      {/* Highlights — scroll-triggered */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Highlights
        </h2>
        <Blurbs />
      </motion.section>
    </div>
  );
}
