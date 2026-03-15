export interface BlurbConfig {
    id: string;
    date: string;
    description: string;
    image: string;
    imageLabel: string;
    title: string;
}

export const LittleBlurbConfigs: BlurbConfig[] = [
    {
        id: '1',
        date: '2024-03-01',
        description: '11+ years at Amazon building production systems across the full stack — from supply chain tooling and internal web apps to distributed cloud infrastructure, DynamoDB, and SNS at global scale. I thrive where complexity meets craft.',
        image: 'https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif',
        imageLabel: 'A Decade of Engineering',
        title: 'A Decade of Engineering'
    },
    {
        id: '2',
        date: '2024-02-15',
        description: 'Designed and shipped APIs handling millions of requests, optimized SQL and NoSQL databases for performance at scale, and built CI/CD pipelines that turn a commit into a production deploy in under 10 minutes.',
        image: 'https://media.giphy.com/media/26n7b7PjSOZJwVCmY/giphy.gif',
        imageLabel: 'Building for Scale',
        title: 'Building for Scale'
    },
    {
        id: '3',
        date: '2024-01-20',
        description: 'Built with React 18, TypeScript, shadcn/ui, Tailwind CSS, Vite, and Framer Motion. Deployed to GitHub Pages. Migrated from CRA to Vite, replaced MUI with shadcn/Tailwind, added dark mode and entrance animations.',
        image: 'https://media.giphy.com/media/26n7b7PjSOZJwVCmY/giphy.gif',
        imageLabel: 'This Portfolio',
        title: 'This Portfolio'
    },
    {
        id: '4',
        date: '2023-12-10',
        description: "When I'm not shipping code, I'm behind a drum kit or exploring new music. I believe creativity in music and engineering share the same root — both reward patience, precision, and the willingness to improvise.",
        image: 'https://media.giphy.com/media/Hcw7rjsIsHcmk/giphy.gif',
        imageLabel: 'Beyond the Terminal',
        title: 'Beyond the Terminal'
    }
];

export const BlurbConfigs: BlurbConfig[] = [
    {
        id: '1',
        date: '2024-03-01',
        description: 'Over a decade building web apps, backend services, and data pipelines that teams rely on. I care about maintainability, documentation, and writing code the next engineer can understand and extend without a meeting.',
        image: 'https://media.giphy.com/media/wswoMIxcP6Usxv8IJN/giphy.gif',
        imageLabel: 'I Build Things That Last',
        title: 'I Build Things That Last'
    },
    {
        id: '2',
        date: '2024-02-01',
        description: 'Debugging is a craft. I approach production incidents and gnarly bugs with curiosity — tracing logs, metrics, and code until I find the root cause. Every hard bug is a lesson worth writing down.',
        image: 'https://media.giphy.com/media/pb2NDIcPTwNpu/giphy.gif',
        imageLabel: 'I Solve Hard Problems',
        title: 'I Solve Hard Problems'
    },
    {
        id: '3',
        date: '2024-01-01',
        description: "Quality isn't optional. I advocate for observability, automated testing, and on-call readiness as first-class concerns. SLOs, dashboards, and runbooks are as important as the feature itself.",
        image: 'https://media.giphy.com/media/GF3mIfPAXhVUSXFtkK/giphy.gif',
        imageLabel: 'Engineering Excellence',
        title: 'Engineering Excellence'
    }
];