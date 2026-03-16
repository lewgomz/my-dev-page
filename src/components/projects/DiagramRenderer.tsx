import { useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from '@/lib/utils';

// ── AWS Service Icons (inline SVG) ─────────────────────────────────────────

function LambdaIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
      <rect width="40" height="40" rx="8" fill="#FF9900" />
      <path d="M12 30L19 14l4 8 3-4 6 12H12z" fill="white" opacity="0.9" />
    </svg>
  );
}

function EventBridgeIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
      <rect width="40" height="40" rx="8" fill="#E7157B" />
      <circle cx="20" cy="20" r="8" stroke="white" strokeWidth="2.5" fill="none" />
      <path d="M20 12v4M20 24v4M12 20h4M24 20h4" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function DynamoDBIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
      <rect width="40" height="40" rx="8" fill="#4053D6" />
      <ellipse cx="20" cy="13" rx="9" ry="4" fill="white" opacity="0.9" />
      <path d="M11 13v14c0 2.2 4 4 9 4s9-1.8 9-4V13" stroke="white" strokeWidth="2" fill="none" />
      <line x1="11" y1="20" x2="29" y2="20" stroke="white" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function SNSIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
      <rect width="40" height="40" rx="8" fill="#E7157B" />
      <path d="M20 10c-5.5 0-10 3-10 7s4.5 7 10 7c1.5 0 3-.3 4.3-.8L28 26v-4.5c1.2-1.3 2-2.9 2-4.5C30 13 25.5 10 20 10z" fill="white" opacity="0.9" />
    </svg>
  );
}

function SQSIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
      <rect width="40" height="40" rx="8" fill="#FF4F8B" />
      <rect x="8" y="15" width="24" height="10" rx="3" fill="white" opacity="0.9" />
      <rect x="12" y="19" width="4" height="2" rx="1" fill="#FF4F8B" />
      <rect x="18" y="19" width="4" height="2" rx="1" fill="#FF4F8B" />
      <rect x="24" y="19" width="4" height="2" rx="1" fill="#FF4F8B" />
    </svg>
  );
}

function S3Icon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
      <rect width="40" height="40" rx="8" fill="#3F8624" />
      <path d="M20 8l11 6v12l-11 6L9 26V14l11-6z" fill="white" opacity="0.9" />
      <path d="M9 14l11 6 11-6" stroke="#3F8624" strokeWidth="1.5" />
      <line x1="20" y1="20" x2="20" y2="32" stroke="#3F8624" strokeWidth="1.5" />
    </svg>
  );
}

function EC2Icon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
      <rect width="40" height="40" rx="8" fill="#FF9900" />
      <rect x="10" y="10" width="20" height="20" rx="3" fill="white" opacity="0.9" />
      <rect x="14" y="14" width="12" height="12" rx="2" fill="#FF9900" />
    </svg>
  );
}

function RDSIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
      <rect width="40" height="40" rx="8" fill="#4053D6" />
      <ellipse cx="20" cy="14" rx="10" ry="4.5" fill="white" opacity="0.9" />
      <path d="M10 14v12c0 2.5 4.5 4.5 10 4.5s10-2 10-4.5V14" stroke="white" strokeWidth="2" fill="none" />
      <line x1="10" y1="20" x2="30" y2="20" stroke="white" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function CloudFrontIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
      <rect width="40" height="40" rx="8" fill="#8C4FFF" />
      <circle cx="20" cy="20" r="10" stroke="white" strokeWidth="2" fill="none" />
      <ellipse cx="20" cy="20" rx="5" ry="10" stroke="white" strokeWidth="1.5" fill="none" />
      <line x1="10" y1="20" x2="30" y2="20" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function APIGatewayIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
      <rect width="40" height="40" rx="8" fill="#FF4F8B" />
      <rect x="8" y="13" width="24" height="14" rx="3" fill="white" opacity="0.9" />
      <path d="M14 20h12M20 14v12" stroke="#FF4F8B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  lambda: <LambdaIcon />,
  eventbridge: <EventBridgeIcon />,
  dynamodb: <DynamoDBIcon />,
  sns: <SNSIcon />,
  sqs: <SQSIcon />,
  s3: <S3Icon />,
  ec2: <EC2Icon />,
  rds: <RDSIcon />,
  cloudfront: <CloudFrontIcon />,
  apigateway: <APIGatewayIcon />,
};

// ── Custom AWS Node ────────────────────────────────────────────────────────

function AWSNode({ data }: { data: { label: string; service: string; handles?: string[] } }) {
  const icon = SERVICE_ICONS[data.service] ?? <EC2Icon />;
  const extraHandles = data.handles ?? [];
  const hasExtra = extraHandles.length > 0;
  return (
    <div className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-lg border border-border bg-card shadow-sm min-w-[80px] border-t-2 border-t-sky-500 cursor-grab active:cursor-grabbing hover:border-sky-500/60 hover:shadow-md transition-shadow duration-150">
      {/* When extra handles exist give every handle an explicit id so React Flow never guesses */}
      <Handle type="target" position={Position.Left}  id={hasExtra ? 'target-left'  : undefined} style={{ opacity: 0 }} />
      {extraHandles.includes('target-right') && (
        <Handle type="target" position={Position.Right} id="target-right" style={{ opacity: 0 }} />
      )}
      {extraHandles.includes('source-top') && (
        <Handle type="source" position={Position.Top} id="source-top" style={{ opacity: 0 }} />
      )}
      <div className="flex items-center justify-center">{icon}</div>
      <span className="text-[10px] font-medium text-center leading-tight text-foreground whitespace-pre-line">
        {data.label}
      </span>
      <Handle type="source" position={Position.Right} id={hasExtra ? 'source-right' : undefined} style={{ opacity: 0 }} />
    </div>
  );
}

const nodeTypes = { awsNode: AWSNode };

// ── Animated Dot Edge (back-and-forth dot along path) ─────────────────────

function AnimatedDotEdge({
  id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, label,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,
  });
  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ strokeDasharray: '6 3' }} />
      <circle r="5" fill="#0ea5e9">
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path={edgePath}
          keyPoints="0;1;0"
          keyTimes="0;0.5;1"
          calcMode="linear"
        />
      </circle>
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan text-[10px] text-foreground/70"
          >
            {label as string}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

const edgeTypes = { animatedDot: AnimatedDotEdge };

// ── DiagramRenderer ────────────────────────────────────────────────────────

interface DiagramRendererProps {
  nodes: Node[];
  edges: Edge[];
  className?: string;
}

export default function DiagramRenderer({ nodes: initialNodes, edges: initialEdges, className }: DiagramRendererProps) {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const diagramKey = `${initialNodes.map(n => n.id).join(',')}-${isDark ? 'dark' : 'light'}`;

  return (
    <div className={cn('rounded-lg border border-border overflow-hidden', className)}>
      <ReactFlow
        key={diagramKey}
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.35 }}
        colorMode={isDark ? 'dark' : 'light'}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
        <MiniMap
          zoomable
          pannable
          nodeColor={() => '#0ea5e9'}
          nodeStrokeColor={() => '#0284c7'}
          nodeStrokeWidth={2}
          maskColor={isDark ? 'rgba(0,0,0,0.55)' : 'rgba(240,240,240,0.7)'}
          style={{ width: 160, height: 110 }}
        />
      </ReactFlow>
    </div>
  );
}
