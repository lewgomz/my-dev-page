import type { Node, Edge } from '@xyflow/react';

export interface ProjectConfig {
  id: string;
  timelineEntryId: string;
  featured: boolean;
  title: string;
  subtitle: string;
  summary: string;
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
    summary:
      'An event-driven pipeline that rebalanced inventory across a network of fulfillment warehouses. No spreadsheets, no manual pulls. Forecasts went in, and transfer decisions came out.',
    description:
      'Built an automated inventory transfer system to rebalance stock across a network of fulfillment warehouses. An event-driven pipeline evaluated inventory levels against demand forecasts, triggered transfer recommendations, and fanned out notifications to downstream logistics consumers. Every decision was durably logged for audit and analytics.',
    image: '/supply-chain-thumbnail.jpg',
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
    summary:
      'A self-serve web app that gave operations stakeholders direct visibility into transfer pipeline metrics. It retired the manual data pulls they used to wait days for.',
    description:
      'Developed a stakeholder-facing web application providing visibility into transfer pipeline activity and outcomes. The app surfaced before/after inventory metrics, transfer approval rates, and trend data. That let operations teams self-serve insights that previously required manual data pulls.',
    image: '/transshipment-thumbnail.jpg',
    imageLabel: 'Stakeholder Dashboard Architecture',
    tags: ['CloudFront', 'S3', 'API Gateway', 'EC2', 'RDS', 'Lambda', 'EventBridge'],
    date: '2018-09-01',
    diagram: {
      nodes: [
        { id: 'cf',        type: 'awsNode', position: { x: 0,    y: 100 }, data: { label: 'CloudFront\nCDN',                service: 'cloudfront' } },
        { id: 's3',        type: 'awsNode', position: { x: 220,  y: 0   }, data: { label: 'S3\nReact Static Assets',      service: 's3'         } },
        { id: 'apigw',     type: 'awsNode', position: { x: 220,  y: 200 }, data: { label: 'API Gateway\nREST API',         service: 'apigateway' } },
        { id: 'ec2_web',   type: 'awsNode', position: { x: 440,  y: 100 }, data: { label: 'EC2\nWeb Tier',                service: 'ec2'        } },
        { id: 'ec2_app',   type: 'awsNode', position: { x: 660,  y: 100 }, data: { label: 'EC2\nApp / Metrics Tier',      service: 'ec2'        } },
        { id: 'rds_primary', type: 'awsNode', position: { x: 880, y: 0   }, data: { label: 'RDS MySQL\nPrimary',           service: 'rds',       handles: ['target-right'] } },
        { id: 'rds_replica', type: 'awsNode', position: { x: 880, y: 200 }, data: { label: 'RDS MySQL\nRead Replica',      service: 'rds'        } },
        { id: 'eb',        type: 'awsNode', position: { x: 1100, y: 100 }, data: { label: 'EventBridge\nTransfer Events',  service: 'eventbridge', handles: ['source-top'] } },
        { id: 'lambda_agg', type: 'awsNode', position: { x: 1320, y: 100 }, data: { label: 'Lambda\nMetric Aggregation',  service: 'lambda'     } },
      ],
      edges: [
        { id: 'cf-s3',          source: 'cf',          target: 's3',          animated: true,  label: '🖥️ static assets',     labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'cf-apigw',       source: 'cf',          target: 'apigw',       animated: true,  label: '🔌 API requests',      labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'apigw-web',      source: 'apigw',       target: 'ec2_web',     type: 'animatedDot', label: '➡️ route',            labelBgStyle: { fill: 'transparent' } },
        { id: 'web-app',        source: 'ec2_web',     target: 'ec2_app',     animated: true,  label: '🔁 proxy',             labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'app-rds',        source: 'ec2_app',     target: 'rds_primary', animated: true,  label: '✏️ writes',            labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'app-replica',    source: 'ec2_app',     target: 'rds_replica', animated: true,  label: '📖 read metrics',      labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'app-eb',         source: 'ec2_app',     target: 'eb',          type: 'animatedDot', sourceHandle: 'source-right', label: '📡 emit events',     labelBgStyle: { fill: 'transparent' } },
        { id: 'eb-lambda',      source: 'eb',          target: 'lambda_agg',  animated: true,  label: '⚡ async aggregate',   labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'lambda-rds',     source: 'lambda_agg',  target: 'rds_primary', type: 'smoothstep', sourceHandle: 'source-top', targetHandle: 'target-right', animated: true, label: '💾 persist rollups', labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
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
    summary:
      'Real-time shift operations tooling that replaced the spreadsheets floor leads were juggling during peak. It put live throughput and exception queues in one place.',
    description:
      'Built and maintained a suite of internal operational tools used by shift leads to monitor real-time floor productivity and inventory status. Tools surfaced key throughput metrics and exception queues, reducing the time spent manually tracking down operational data during peak periods.',
    image: '/ops-tooling-thumbnail.jpg',
    imageLabel: 'Ops Tooling Architecture',
    tags: ['EC2', 'MySQL', 'S3', 'Ruby on Rails'],
    date: '2016-10-01',
    diagram: {
      nodes: [
        { id: 'cf',         type: 'awsNode', position: { x: 0,    y: 100 }, data: { label: 'CloudFront\nStatic Assets',       service: 'cloudfront' } },
        { id: 'ec2_web',    type: 'awsNode', position: { x: 220,  y: 100 }, data: { label: 'EC2 Web Tier\nRails App',         service: 'ec2'        } },
        { id: 'rds_pri',    type: 'awsNode', position: { x: 440,  y: 0   }, data: { label: 'RDS MySQL\nPrimary',             service: 'rds'        } },
        { id: 'ec2_wkr',    type: 'awsNode', position: { x: 440,  y: 200 }, data: { label: 'EC2 Worker Tier\nBackground Jobs', service: 'ec2',       handles: ['source-top'] } },
        { id: 'rds_rep',    type: 'awsNode', position: { x: 660,  y: 0   }, data: { label: 'RDS MySQL\nRead Replica',         service: 'rds'        } },
        { id: 'eb',         type: 'awsNode', position: { x: 660,  y: 200 }, data: { label: 'EventBridge\nCron',               service: 'eventbridge' } },
        { id: 'lambda',     type: 'awsNode', position: { x: 880,  y: 110 }, data: { label: 'Lambda\nReport ETL',             service: 'lambda'     } },
        { id: 's3',         type: 'awsNode', position: { x: 1100, y: 0   }, data: { label: 'S3\nReports & Exports',          service: 's3'         } },
        { id: 'sns',        type: 'awsNode', position: { x: 1100, y: 200 }, data: { label: 'SNS\nShift Alerts',              service: 'sns'        } },
      ],
      edges: [
        { id: 'cf-web',      source: 'cf',      target: 'ec2_web',                                 type: 'animatedDot', label: '📊 dashboard requests',                                                                                          },
        { id: 'web-pri',     source: 'ec2_web', target: 'rds_pri',                                 animated: true, label: '✏️ live writes',       labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'web-wkr',     source: 'ec2_web', target: 'ec2_wkr', targetHandle: 'target-left',    animated: true, label: '🧰 background jobs',   labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'wkr-pri',     source: 'ec2_wkr', target: 'rds_pri', sourceHandle: 'source-top', type: 'smoothstep', animated: true, label: '📈 throughput writes', labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'pri-rep',     source: 'rds_pri', target: 'rds_rep',                                 animated: true, label: '🔄 replication',       labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'eb-lambda',   source: 'eb',      target: 'lambda',                                  animated: true, label: '⏰ cron schedule',     labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'rep-lambda',  source: 'rds_rep', target: 'lambda',                                  animated: true, label: '📥 read snapshot',     labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
        { id: 'lambda-s3',   source: 'lambda',  target: 's3',                                      type: 'animatedDot', label: '📦 reports / exports',                                                                                          },
        { id: 'lambda-sns',  source: 'lambda',  target: 'sns',                                     animated: true, label: '🔔 shift alerts',      labelBgStyle: { fill: 'transparent' }, style: { strokeDasharray: '6 3' } },
      ],
    },
    results: [
      'Improved shift lead visibility into real-time floor throughput and exception queues',
      'Reduced manual data lookups during high-volume operational periods',
      'Trained and onboarded new team members on the internal tooling suite',
    ],
  },
];
