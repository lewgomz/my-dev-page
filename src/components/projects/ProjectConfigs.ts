import type { Node, Edge } from '@xyflow/react';

export interface ProjectConfig {
  id: string;
  timelineEntryId: string;
  featured: boolean;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageLabel: string;
  tags: string[];
  date: string;
  diagram: { nodes: Node[]; edges: Edge[] };
  results: string[];
}

export const ProjectConfigs: ProjectConfig[] = [
  {
    id: 'supply-chain-pipeline',
    timelineEntryId: 'bie-prime-now',
    featured: true,
    title: 'Supply Chain - Rebalance Inventory System',
    subtitle: 'Real-time inventory rebalancing across distributed fulfillment networks',
    description:
      'Built an automated inventory transfer system to rebalance stock across a network of fulfillment warehouses. An event-driven pipeline evaluated inventory levels against demand forecasts, triggered transfer recommendations, and fanned out notifications to downstream logistics consumers — with all decisions durably logged for audit and analytics.',
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGZ0NzRsc2c5c2psZWRpb3ltdHRhaTh0YmFsOThuMzdvcmdnYWk0cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CTX0ivSQbI78A/giphy.gif',
    imageLabel: 'Supply Chain Pipeline Diagram',
    tags: ['EventBridge', 'Lambda', 'SQS', 'RDS', 'SNS'],
    date: '2019-03-01',
    diagram: {
      nodes: [
        { id: 'eb',              type: 'awsNode', position: { x: 0,    y: 100 }, data: { label: 'EventBridge\nCron',              service: 'eventbridge' } },
        { id: 'lambda_forecast', type: 'awsNode', position: { x: 220,  y: 100 }, data: { label: 'Forecast\nProcessor',            service: 'lambda'      } },
        { id: 'rds',             type: 'awsNode', position: { x: 440,  y: 0   }, data: { label: 'RDS MySQL\nMetadata + Inventory', service: 'rds',         handles: ['target-right'] } },
        { id: 'api_demand',      type: 'awsNode', position: { x: 440,  y: 200 }, data: { label: 'Transshipment\nDemand API',       service: 'apigateway'  } },
        { id: 'sqs',             type: 'awsNode', position: { x: 660,  y: 100 }, data: { label: 'SQS\nRetry Queue',                service: 'sqs'         } },
        { id: 'lambda_gen',      type: 'awsNode', position: { x: 880,  y: 100 }, data: { label: 'Generate\nTransshipment',         service: 'lambda',      handles: ['source-top'] } },
        { id: 'api_transship',   type: 'awsNode', position: { x: 1100, y: 0   }, data: { label: 'Transshipment\nAPI',              service: 'apigateway'  } },
        { id: 'sns',             type: 'awsNode', position: { x: 1100, y: 200 }, data: { label: 'SNS\nAlerts',                     service: 'sns'         } },
        { id: 'email_sub',       type: 'awsNode', position: { x: 1320, y: 120 }, data: { label: 'Email\nSubscribers',              service: 'apigateway'  } },
        { id: 'im_sub',          type: 'awsNode', position: { x: 1320, y: 280 }, data: { label: 'IM\nNotifications',               service: 'apigateway'  } },
      ],
      edges: [
        { id: 'eb-forecast',  source: 'eb',              target: 'lambda_forecast', animated: true, label: '⏰ cron trigger',        labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'forecast-rds', source: 'lambda_forecast', target: 'rds',             targetHandle: 'target-left',  animated: true, label: '💾 read / write',        labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'forecast-api', source: 'lambda_forecast', target: 'api_demand',      animated: true, label: '📡 fetch demand',        labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'forecast-sqs', source: 'lambda_forecast', target: 'sqs',             animated: true, label: '📬 enqueue',             labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'sqs-gen',      source: 'sqs',             target: 'lambda_gen',      targetHandle: 'target-left',  animated: true, label: '🔄 retry-safe trigger',  labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'gen-rds',      source: 'lambda_gen',      target: 'rds',             type: 'smoothstep', sourceHandle: 'source-top', targetHandle: 'target-right', animated: true, label: '✏️ update metadata',  labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'gen-api',      source: 'lambda_gen',      target: 'api_transship',   type: 'animatedDot', sourceHandle: 'source-right', label: '📦 submit / receive', labelBgStyle: { fill: 'transparent' } },
        { id: 'gen-sns',      source: 'lambda_gen',      target: 'sns',             sourceHandle: 'source-right', animated: true, label: '🔔 success / failure',   labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'sns-email',    source: 'sns',             target: 'email_sub',       animated: true, label: '📧 HTML email',          labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'sns-im',       source: 'sns',             target: 'im_sub',          animated: true, label: '💬 instant message',     labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
      ],
    },
    results: [
      'Automated transfer candidate evaluation across thousands of warehouse-item pairs daily',
      'Reduced manual intervention in inventory rebalancing workflows',
      'Enabled near real-time event propagation to downstream fulfillment consumers via SNS',
    ],
  },
  {
    id: 'inventory-web-app',
    timelineEntryId: 'bie-prime-now',
    featured: true,
    title: 'Real-Time Transshipment Visibilty',
    subtitle: 'Internal web application surfacing pre/post-transfer metrics for operations stakeholders',
    description:
      'Developed a stakeholder-facing web application providing visibility into transfer pipeline activity and outcomes. The app surfaced before/after inventory metrics, transfer approval rates, and trend data — enabling operations teams to self-serve insights previously requiring manual data pulls.',
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTllY296MjgwY25lazZhZnp1bGxqaHh6MGlyMGNmNnhvZmQzaGJ4NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Q9aBxHn9fTqKs/giphy.gif',
    imageLabel: 'Stakeholder Dashboard Architecture',
    tags: ['EC2', 'RDS', 'CloudFront', 'S3'],
    date: '2018-09-01',
    diagram: {
      nodes: [
        { id: 'cf', type: 'awsNode', position: { x: 0, y: 100 }, data: { label: 'CloudFront', service: 'cloudfront' } },
        { id: 's3', type: 'awsNode', position: { x: 200, y: 0 }, data: { label: 'S3\nStatic Assets', service: 's3' } },
        { id: 'ec2', type: 'awsNode', position: { x: 200, y: 200 }, data: { label: 'EC2\nApp Server', service: 'ec2' } },
        { id: 'rds', type: 'awsNode', position: { x: 420, y: 200 }, data: { label: 'RDS MySQL\nTransfer Records', service: 'rds' } },
      ],
      edges: [
        { id: 'cf-s3', source: 'cf', target: 's3' },
        { id: 'cf-ec2', source: 'cf', target: 'ec2', animated: true },
        { id: 'ec2-rds', source: 'ec2', target: 'rds', animated: true },
      ],
    },
    results: [
      'Replaced ad-hoc data requests with self-serve metrics dashboards for operations teams',
      'Provided pre/post-transfer inventory visibility across the warehouse network',
      'Supported data-driven decision making for inventory planning stakeholders',
    ],
  },
  {
    id: 'ops-dashboards',
    timelineEntryId: 'program-dev-sbd',
    featured: true,
    title: 'Fulfillment Center Operations Tooling',
    subtitle: 'Real-time productivity and inventory dashboards for shift operations',
    description:
      'Built and maintained a suite of internal operational tools used by shift leads to monitor real-time floor productivity and inventory status. Tools surfaced key throughput metrics and exception queues, reducing the time spent manually tracking down operational data during peak periods.',
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTllY296MjgwY25lazZhZnp1bGxqaHh6MGlyMGNmNnhvZmQzaGJ4NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sk6yL9EGVeAcE/giphy.gif',
    imageLabel: 'Ops Tooling Architecture',
    tags: ['EC2', 'MySQL', 'S3', 'Ruby on Rails'],
    date: '2016-10-01',
    diagram: {
      nodes: [
        { id: 'ec2', type: 'awsNode', position: { x: 0, y: 100 }, data: { label: 'EC2\nRails App', service: 'ec2' } },
        { id: 's3', type: 'awsNode', position: { x: 220, y: 0 }, data: { label: 'S3\nReports & Exports', service: 's3' } },
        { id: 'rds', type: 'awsNode', position: { x: 220, y: 200 }, data: { label: 'MySQL\nOperations DB', service: 'rds' } },
        { id: 'lambda', type: 'awsNode', position: { x: 440, y: 100 }, data: { label: 'Data\nPipelines', service: 'lambda' } },
      ],
      edges: [
        { id: 'ec2-s3', source: 'ec2', target: 's3' },
        { id: 'ec2-rds', source: 'ec2', target: 'rds', animated: true },
        { id: 'rds-lambda', source: 'rds', target: 'lambda', animated: true },
        { id: 'lambda-s3', source: 'lambda', target: 's3' },
      ],
    },
    results: [
      'Improved shift lead visibility into real-time floor throughput and exception queues',
      'Reduced manual data lookups during high-volume operational periods',
      'Trained and onboarded new team members on the internal tooling suite',
    ],
  },
];
