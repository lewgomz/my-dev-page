import { motion } from 'framer-motion';

interface TimelineEntry {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

const entries: TimelineEntry[] = [
  {
    role: 'Senior Software Development Engineer',
    company: 'Amazon · Tempe, AZ',
    period: 'Oct 2024 – Present',
    highlights: [
      'Leading software development initiatives across distributed systems at Amazon',
      'Driving architectural decisions and technical strategy for high-scale services',
    ],
  },
  {
    role: 'Senior System Development Engineer',
    company: 'Amazon · Seattle, WA',
    period: 'Dec 2022 – Nov 2024',
    highlights: [
      'Owned and operated large-scale systems across Amazon DynamoDB and SNS infrastructure',
      'Led cross-team technical projects improving reliability, scalability, and operational efficiency',
    ],
  },
  {
    role: 'System Development Engineer',
    company: 'Amazon · Seattle, WA',
    period: 'Jun 2020 – Dec 2022',
    highlights: [
      'Built and maintained distributed systems supporting Amazon DynamoDB and SNS at global scale',
      'Delivered tooling and automation to reduce operational burden and improve system observability',
    ],
  },
  {
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
    role: 'Program Developer',
    company: 'Amazon · San Bernardino, CA',
    period: 'Jul 2016 – Aug 2017',
    highlights: [
      'Built and managed Ruby on Rails web apps on EC2 with MySQL backends — inventory heat maps, real-time pick/stow/bin activity pipelines, and defect/pattern recognition tools',
      'Led end-to-end infrastructure (DNS, certs, networking) and trained a team of 4 analysts in programming, web development, and stakeholder engagement to deliver 30+ internal tools',
    ],
  },
  {
    role: 'Data Analyst',
    company: 'Amazon · San Bernardino, CA',
    period: 'Sep 2015 – Jun 2016',
    highlights: [
      'Built interactive operations dashboards and automated Excel/VBA tools to monitor Inbound, Outbound, and ICQA performance for shift leaders and managers',
      'Designed Ruby and VBA scripts with complex Oracle SQL to generate inventory accuracy and productivity metrics supporting root-cause analysis across the fulfillment center',
    ],
  },
];

export default function Timeline() {
  return (
    <div className="relative border-l-2 border-sky-500 pl-6 space-y-5">
      {entries.map((entry) => (
        <motion.div
          key={entry.role + entry.period}
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
          </div>
        </motion.div>
      ))}
    </div>
  );
}
