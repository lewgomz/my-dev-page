export interface TimelineEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export const TimelineEntries: TimelineEntry[] = [
  {
    id: 'sde-senior-amazon',
    role: 'Senior Software Development Engineer',
    company: 'Amazon · Tempe, AZ',
    period: 'Oct 2024 – Present',
    highlights: [
      'Leading software development initiatives across distributed systems at Amazon',
      'Driving architectural decisions and technical strategy for high-scale services',
    ],
  },
  {
    id: 'sde-system-senior-amazon',
    role: 'Senior System Development Engineer',
    company: 'Amazon · Seattle, WA',
    period: 'Dec 2022 – Nov 2024',
    highlights: [
      'Owned and operated large-scale systems across Amazon DynamoDB and SNS infrastructure',
      'Led cross-team technical projects improving reliability, scalability, and operational efficiency',
    ],
  },
  {
    id: 'sde-system-amazon',
    role: 'System Development Engineer',
    company: 'Amazon · Seattle, WA',
    period: 'Jun 2020 – Dec 2022',
    highlights: [
      'Built and maintained distributed systems supporting Amazon DynamoDB and SNS at global scale',
      'Delivered tooling and automation to reduce operational burden and improve system observability',
    ],
  },
  {
    id: 'bie-prime-now',
    role: 'Business Intelligence Engineer',
    company: 'Amazon Prime Now',
    period: 'Sep 2017 – Jun 2020',
    highlights: [
      'Built an automated inventory transfer system for all North American Prime Now warehouses, optimizing item-level days of cover using demand forecasts and vendor replenishments',
      'Designed a web app surfacing transshipment details, pre/post-rebalance metrics, and warehouse-level drill-downs for supply chain stakeholders',
      'Partnered with engineering teams to integrate forecasting and transshipment services, refining business logic for edge cases around forecast accuracy and inventory availability',
    ],
  },
  {
    id: 'program-dev-sbd',
    role: 'Program Developer',
    company: 'Amazon · San Bernardino, CA',
    period: 'Jul 2016 – Aug 2017',
    highlights: [
      'Built and managed Ruby on Rails web apps on EC2 with MySQL backends — inventory heat maps, real-time pick/stow/bin activity pipelines, and defect/pattern recognition tools',
      'Led end-to-end infrastructure (DNS, certs, networking) and trained a team of 4 analysts in programming, web development, and stakeholder engagement to deliver 30+ internal tools',
    ],
  },
  {
    id: 'data-analyst-sbd',
    role: 'Data Analyst',
    company: 'Amazon · San Bernardino, CA',
    period: 'Sep 2015 – Jun 2016',
    highlights: [
      'Built interactive operations dashboards and automated Excel/VBA tools to monitor Inbound, Outbound, and ICQA performance for shift leaders and managers',
      'Designed Ruby and VBA scripts with complex Oracle SQL to generate inventory accuracy and productivity metrics supporting root-cause analysis across the fulfillment center',
    ],
  },
];
