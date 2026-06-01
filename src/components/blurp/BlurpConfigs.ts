export interface BlurbConfig {
    id: string;
    date: string;
    summary: string;
    description: string;
    image: string;
    imageLabel: string;
    title: string;
}

export const LittleBlurbConfigs: BlurbConfig[] = [
    {
        id: '5',
        date: '2026-04-18',
        title: 'Building Agent-First Applications',
        summary: 'For two years we bolted LLMs onto existing apps as a feature. Agent-first flips it. The agent is the application, and everything else is just a tool it reaches for. That one reordering changes every design decision downstream.',
        description: `The first wave of AI features were all the same shape. You take an existing app, add a chat box, wire it to a model, and call it intelligent. The model was a guest in someone else's architecture. It answered questions about the app, but it didn't run the app. I built a few of those. They were fine. They were also a dead end.

Agent-first inverts the relationship. The agent isn't a feature inside the application. The agent is the application. Your database, your APIs, and your business logic become tools it decides to use. That sounds like a semantic distinction until you try to design one. Then it changes everything. You stop writing the control flow. You start writing the environment the agent operates in.

Concretely, the work moves. In a traditional app, I spend my time on the happy-path sequence: do this, then this, then return that. In an agent-first app there is no fixed sequence, because the agent chooses. So my job becomes three things. I define the action space, meaning what tools exist and what they're allowed to do. I shape the observations, meaning what the agent sees after each action. And I draw the guardrails, meaning what it can never do without a human in the loop. The determinism I used to get for free, I now have to engineer back in deliberately, and only where it matters.

This is uncomfortable for engineers, and it should be. We're trained to eliminate nondeterminism. Agent-first asks us to embrace it where flexibility is the point, then fence it off everywhere else. The systems that work draw that line carefully. The ones that don't fail in one of two ways. They either cage the agent until it's just a slow if-statement, or they hand it the keys to everything and find out in production why that was a bad idea.

I don't think every app should be agent-first. A form is still a form. But some problems can't be enumerated in advance. Triage, research, and multi-step operations across messy real systems all fall into that bucket. For those, treating the agent as a first-class primitive instead of a bolt-on feature is the difference between a demo and something people rely on. The hard part isn't the model anymore. It's the architecture around it, which happens to be the part I've spent a decade learning to get right.`,
        image: '/posts/post-5.jpg',
        imageLabel: 'Building Agent-First Applications'
    },
    {
        id: '6',
        date: '2026-03-09',
        title: 'AWS Agent Core',
        summary: 'AWS shipped primitives for running agents in production: runtime, memory, identity, and gateways. Here is what Agent Core actually does, where it earns its place in the stack, and where I would still reach for something else.',
        description: `Every cloud vendor is racing to own the agent stack, and AWS's entry is Agent Core. It's a set of managed primitives for the unglamorous parts of running agents in production. Not the model. Not the prompt. The runtime, the memory, the identity, and the gateway between an agent and the tools it's allowed to call. It's the boring infrastructure that decides whether your agent survives outside a notebook.

The honest framing is that Agent Core is plumbing, and I mean that as a compliment. The hard problems in production agents aren't about whether the model can reason. They're more practical than that. Where does this agent's memory live across sessions? How do I give it scoped, auditable access to internal APIs without handing it god-mode credentials? How do I run untrusted, model-generated actions in something that isn't my main process? Those are infrastructure problems. They're exactly the problems AWS has spent twenty years being good at.

Here is where it fits. If you're already deep in AWS, Agent Core slots in without you reinventing session memory or building a tool gateway from scratch. The runtime isolation is the piece I find most compelling. Executing an agent's actions in a sandboxed, ephemeral environment is the kind of thing everyone hand-rolls badly, so a managed version is worth real money. The identity model is the other strong piece. An agent gets its own scoped permissions instead of borrowing yours, which is the right shape for anyone who has thought seriously about the blast radius.

Here is where I'd still hesitate. It's early. On AWS, "managed" often means "opinionated in ways you'll discover at 2am." The abstractions are young, the docs are thinner than the marketing, and you're betting on a fast-moving surface area. For a prototype, I'd stay lighter and more portable. For a team that's already all-in on AWS and needs to put agents in front of real users with real compliance requirements, it's a serious option. It saves you from building the least interesting sixty percent yourself.

My take is that Agent Core isn't trying to be magic, and that's why it's interesting. It's an admission that the agent era runs on the same concerns as every era before it. Identity, isolation, state, and access control all still matter. They're just pointed at a new kind of workload. That's a bet I'm comfortable making.`,
        image: '/posts/post-6.jpg',
        imageLabel: 'AWS Agent Core'
    },
    {
        id: '7',
        date: '2026-02-02',
        title: 'Harness Mode: Specialized Agents and the Tools They Need',
        summary: 'The instinct is to build one smart agent that can do everything. It doesn\'t scale. The pattern that holds up is narrow agents, each with exactly the tools its job requires, and nothing more.',
        description: `The first agent everyone builds is a generalist. One agent, every tool, and a prompt that says "you are a helpful assistant that can do anything." It demos beautifully. Then you give it eleven tools and watch it confidently pick the wrong one. Or it burns half its context just deciding which to use. That's when you start to understand why the generalist is a trap.

The pattern that actually holds up is the opposite. Use narrow agents with narrow toolsets. One agent reviews code and has read access plus a linter, but not the ability to deploy. One agent writes tests and can run them, and nothing else. Each agent gets exactly the tools its job requires and is blind to the rest. Counterintuitively, the agent gets better as you take tools away. Every tool you remove is a wrong turn it can no longer take.

This is a harness problem more than a model problem. The model's reasoning isn't the bottleneck. The action space is. A well-scoped agent with five relevant tools outperforms a brilliant one with forty. The cost of choosing wrong scales with the number of choices, and so does the cost of a mistake. Constraining the action space is the single highest-leverage thing I do when an agent misbehaves. It beats prompt-tuning. It beats swapping models.

It also changes how the system composes. Once each agent is narrow, you orchestrate them like services. A coordinator routes work. Specialists do the work. Clean boundaries sit between them. That's a familiar shape. It's microservices with judgment. And it brings the familiar benefits. You can test a specialist in isolation, reason about its blast radius, and swap it out without the whole thing collapsing.

The lesson I keep relearning is that "give the AI more capability" is almost always the wrong move. The leverage is in subtraction. Decide what each agent is for. Hand it precisely the tools that job needs. Then let the orchestration be where the intelligence lives, rather than any individual agent's heroics.`,
        image: '/posts/post-7.jpg',
        imageLabel: 'Harness Mode'
    },
    {
        id: '8',
        date: '2026-01-15',
        title: 'Claude Code: Beyond the Autocomplete',
        summary: 'Autocomplete guesses your next line. Claude Code takes a goal, explores the repo, makes the changes, runs the tests, and comes back. After months of it as my primary tool, here is where it genuinely shines and where it still needs me in the loop.',
        description: `Autocomplete finishes your line. What I do now is a different category of thing. I hand a tool a goal, something like "migrate this module off the deprecated API and make the tests pass." Then I watch it read the codebase, make edits across a dozen files, run the suite, read the failures, and fix them. The unit of work moved from the keystroke to the task. That reframing is the whole story.

I've used Claude Code as a primary dev tool for months, and here is the honest version. It transformed the parts of the job I never enjoyed and left the parts I do mostly intact. The grunt work is where it earns its keep daily. The mechanical refactor. The test scaffolding. The "change this pattern in forty places." It's tireless at exactly the work that used to make me tired.

Where it shines is the agentic loop. It doesn't just suggest. It acts, observes the result, and corrects. Point it at a failing test and it will actually run the thing, read the stack trace, and reason about the fix instead of guessing from the source alone. That feedback loop is the difference between a smarter autocomplete and something that can finish a task. The first time it fixed a bug by reading the actual error output, I stopped thinking of it as a fancier IDE.

Where it still needs me is judgment and taste. It will happily implement the thing I asked for, even when the thing I asked for was wrong. It doesn't push back on a bad architectural call the way a good colleague would, unless I set it up to. It's confident in the same flat tone whether it's right or guessing. So the skill that matters now is reviewing fast and knowing what to verify. I've become a better reviewer out of necessity, because I'm reviewing a lot more code that I didn't type.

The mental shift that took me longest is this. I'm not really writing code anymore. I'm specifying it and verifying it. My leverage moved up a level, toward clear problem statements, good tests, and tight feedback loops the agent can run against. That's a more senior version of the job, honestly. The typing was never the valuable part.`,
        image: '/posts/post-8.jpg',
        imageLabel: 'Claude Code: Beyond the Autocomplete'
    },
    {
        id: '11',
        date: '2025-12-03',
        title: "Google's Antigravity",
        summary: "Google's Antigravity is its real move in the agent space, and the interesting part isn't the benchmark numbers. It's what the bet says about where agentic development is heading, and the leverage Google has that the model labs don't.",
        description: `The benchmark wars are the least interesting thing happening in AI, and Google's Antigravity is a good example of why. Everyone leads with the scores. The scores will be beaten next quarter. What actually matters is the shape of the bet underneath. Antigravity is a clear statement about where Google thinks agentic development is going.

The interesting thing about Google in this race isn't the model. It's the surrounding leverage. They own the browser. They own a huge slice of the developer's daily environment. They own a deep cloud and decades of infrastructure built for exactly the kind of large-scale orchestration that agents need. A model lab has to build the surface area agents run on. Google already owns a lot of it. Antigravity reads as an attempt to turn that latent advantage into an agent-first development experience, and that's a more durable moat than any single eval.

Here is what I read into it. The platforms are converging on the same thesis from opposite sides. The model labs are pushing up from the model into tooling and harnesses. The platform companies are pushing in from the infrastructure and the IDE toward the model. Antigravity is Google coming from the platform side. It leads with the environment the agent lives in rather than the raw intelligence, betting that the orchestration layer is where the long-term value accrues.

I'm cautious about reading too much into any launch. Google has a long history of impressive launches that don't survive contact with their own org chart. "Google ships an agent thing" is not automatically "Google wins agents." Execution and follow-through are the open questions, and they're real ones. But strategically the move makes sense. It tells you something that the company with the most infrastructure is treating agentic development as a first-class platform bet rather than a feature.

Here is why it matters beyond the benchmarks. When the players with the deepest infrastructure start building for agents instead of around them, that's the signal the paradigm is real. Antigravity isn't interesting because of where it ranks today. It's interesting because of who is making the bet, and what their making it tells you about the next five years.`,
        image: '/posts/post-11.jpg',
        imageLabel: "Google's Antigravity"
    },
    {
        id: '10',
        date: '2025-10-21',
        title: 'Codex in Practice',
        summary: "OpenAI's Codex, used in anger on real work. Where it fits next to the alternatives, what its strengths actually are day to day, and the honest tradeoffs. No leaderboard, just what it's like to live with.",
        description: `Benchmarks tell you who wins a contrived task in a clean repo. They tell you almost nothing about what a tool is like to live with on a messy real codebase at 4pm on a Thursday. So this is the other thing. Codex used in anger, on actual work, with all the alternatives sitting one tab over.

Codex is strong, and its strength has a particular flavor. It's quick and it commits. Point it at a well-shaped task and it moves, generating a complete attempt fast rather than hedging. For a lot of work, that decisiveness is exactly right. A self-contained function. A standard endpoint. A transformation I could write myself but don't want to. It gets to a reviewable draft quickly, and a fast draft I can correct beats a slow one I have to wait for.

The tradeoffs show up at the edges, and they're the same edges every tool in this category has. On a large, idiosyncratic codebase with conventions that aren't written down anywhere, it will confidently do the standard thing when the standard thing is wrong for your code. It's only as good as the context it can see. Feeding it the right context is most of the skill of using it well. That means the relevant files, the constraints, and the "we don't do it that way here."

Here is how I actually use it. I don't pick one tool and marry it. I reach for different agents for different shapes of work, and Codex has a clear lane. It's fast, competent generation on well-scoped tasks where I can review the output quickly. The mistake is treating any of these as a single oracle. They're a toolbox. Knowing which one to grab for which job is the real skill now, more than loyalty to any one brand.

Here is the meta-point. We've stopped comparing these tools on whether they can write code, because they all can. We compare them on feel now. Latency. How they handle ambiguity. Whether they hedge or commit. How gracefully they fail. Those are taste judgments you can only make by using them on real work. Codex earns a permanent slot in my rotation. It's not the only tool, but it's a sharp one for the jobs it's sharp at.`,
        image: '/posts/post-10.jpg',
        imageLabel: 'Codex in Practice'
    },
    {
        id: '9',
        date: '2025-08-14',
        title: 'Kiro: AI-Native Development',
        summary: '"AI-native" gets thrown around like it means something. Kiro is one of the more honest attempts to define it. It builds the environment around the agent from the start instead of retrofitting AI into an editor designed for humans.',
        description: `"AI-native" is one of those phrases that means everything and nothing. It usually gets slapped on a product that added a chat sidebar last quarter. Kiro is interesting because it takes the phrase literally. Instead of bolting an assistant onto an editor designed for a human typing one character at a time, it asks a different question. What does the environment look like if the agent is assumed from the start?

The distinction matters more than it sounds. Most AI coding tools are retrofits. The editor was built for humans, and the AI lives in a panel off to the side, reaching into a workflow that wasn't designed for it. AI-native flips the assumption. The spec, the plan, the tasks, and the implementation are all first-class artifacts the agent works through. The human steers at the level of intent rather than diving into every line.

What I find genuinely useful is the emphasis on spec-driven flow. A lot of agent failures come from a vague ask. You say "build the thing," the agent guesses, and you spend the next hour correcting a misunderstanding you could have caught upfront. Forcing a spec and a plan before code is the kind of discipline I would impose on myself if I were more disciplined. There's real value in a tool that makes the structured path the default instead of the thing you skip under deadline.

I'm not fully sold that the paradigm is settled. I'd be lying if I said the workflow doesn't sometimes feel like ceremony for tasks that didn't need it. Not every change deserves a spec. But the underlying bet matches my experience exactly. The bottleneck in AI-assisted development is shared understanding between you and the agent, not raw code generation. That's the real problem, and it's good to see a tool aim straight at it.

The label will fade. Everyone will claim "AI-native" within a year, and it will mean nothing again. What will stick is the idea underneath. Design the environment for how the work actually happens now, not for how it happened when the agent didn't exist. Kiro is a serious attempt at that, and the attempts are how we figure out what the next default looks like.`,
        image: '/posts/post-9.jpg',
        imageLabel: 'Kiro: AI-Native Development'
    },
    {
        id: '1',
        date: '2024-03-01',
        title: 'A Decade of Engineering',
        summary: 'Eleven-plus years at Amazon, from supply-chain pipelines to AI tooling. Here is what stays the same when everything else changes, and why I stopped being surprised by what breaks.',
        description: `I joined Amazon in 2013 thinking the hard part would be the code. Eleven years later, I know the code was the easy part. The hard part was everything around it. The on-call pages at 3am. The migration nobody wanted to own. The system that worked fine right up until the day a holiday traffic spike found the one assumption we never wrote down.

I started in fulfillment, building tooling for the people who actually move boxes. That work taught me more about software than any framework ever did. The feedback loop was brutal and immediate. If my dashboard lied, a shift lead made a bad call, and you heard about it. From there I moved into supply chain, building the event-driven pipelines that rebalance inventory across warehouses. That's the kind of system where a bug doesn't throw an exception. It quietly ships product to the wrong building.

The thread through all of it has been the same. Real systems, real constraints, real consequences. I've rarely had the luxury of greenfield for long. Most of my career has been the harder, more interesting problem. You change the engine while the plane is flying, with customers depending on it not falling out of the sky.

These days the work has shifted toward AI and agent tooling. From the outside that looks like a totally different discipline. It isn't. The fundamentals that mattered in 2014 still matter. Clear boundaries. Observability. Designing for the failure case first. They matter even more when the thing you're building can take actions on its own.

That's the throughline of everything here. I build systems that have to survive contact with reality. After a decade-plus of doing it, I've stopped being surprised by what breaks. I've started being deliberate about it instead.`,
        image: '/posts/post-1.jpg',
        imageLabel: 'A Decade of Engineering'
    },
    {
        id: '2',
        date: '2024-02-15',
        title: 'Building for Scale',
        summary: "APIs that handle millions of requests don't get there by accident. A look at the unglamorous decisions that decide whether a system survives its own success: SQL versus NoSQL, queue depth, and the deploy pipeline.",
        description: `Scale is the word everyone reaches for and almost nobody defines. In my experience it means one specific, uncomfortable thing. The moment your system's success becomes the reason it falls over. The traffic you wanted shows up, and the shortcut you took eighteen months ago is suddenly the incident.

I've built APIs that serve millions of requests, and the parts that mattered were never the parts that felt clever. It was choosing the right datastore for the access pattern instead of the one I knew best. It was deciding early whether a write needed to be synchronous or could be a message on a queue, then living with the consistency tradeoffs that choice locks in. SQL or NoSQL is rarely a religious question. It's a question of how you're going to read the data at a hundred times the volume.

The other half of scale is the boring half. How fast can you ship a fix? A pipeline that turns a commit into a production deploy in under ten minutes isn't a vanity metric. It's the difference between an incident that lasts twenty minutes and one that lasts all afternoon. The fix exists, but you can't get it out the door.

I've learned to design for the failure case first. What happens when the downstream service is slow? When the queue backs up? When a deploy goes bad at the worst possible moment? Systems that scale aren't the ones that handle the happy path elegantly. They're the ones that degrade in ways you chose on purpose, instead of ways the universe chose for you.

None of this is glamorous. There's no demo for "we set the retry budget correctly." But it's the work that decides whether a system gets to grow up or dies the first time it gets popular.`,
        image: '/posts/post-2.jpg',
        imageLabel: 'Building for Scale'
    },
    {
        id: '3',
        date: '2024-01-20',
        title: 'This Portfolio',
        summary: "The site you're reading is also a deliberate set of choices. Why I rebuilt it on Vite and React, dropped the component library I'd outgrown, and treated my own portfolio like a real project.",
        description: `This site is small enough that I could have built it any way I wanted, which is exactly why the choices say something. I treated it like a real project. The alternative was a throwaway template I'd be embarrassed to open the source on, and that felt worse than the work.

It runs on React 18 and TypeScript, built with Vite, styled with Tailwind and shadcn/ui, animated with Framer Motion, and deployed to GitHub Pages. None of that is exotic, and that's the point. I wanted a stack I'd actually reach for at work, not a showcase of every shiny thing I could bolt on.

The interesting part was what I removed. This started life on Create React App with MUI, and both had quietly become friction. CRA's dev server was slow enough to break my flow. MUI gave me components I was constantly fighting to restyle. Migrating to Vite was a same-day win. The feedback loop got fast enough that I stopped context-switching while I waited for it. Trading MUI for shadcn and Tailwind meant I owned my components instead of overriding someone else's opinions.

I added the things I actually care about as a user. Dark mode that respects your system preference. Entrance animations that feel intentional instead of decorative. Architecture diagrams for my projects that you can actually read, instead of a wall of bullet points.

A portfolio is a weird artifact. It's both the work and an example of the work. So the most honest thing I could do was build it the way I build everything else. Pick boring, proven tools. Remove what's fighting me. Sweat the details a user will feel even if they never name them.`,
        image: '/posts/post-3.jpg',
        imageLabel: 'This Portfolio'
    },
    {
        id: '4',
        date: '2023-12-10',
        title: 'Beyond the Terminal',
        summary: "I play drums. It's not a break from engineering. It's the same muscle worked from a different angle. Both reward patience, timing, and knowing when to hold back.",
        description: `Behind a drum kit, you can't fake timing. There's no linter, no code review, no second commit. You're either in the pocket or you're not, and everyone in the room can hear which. I've come to think that's the most honest feedback loop I have outside of a production incident.

I play drums, and I chase down music I haven't heard before with the same compulsion I bring to a system I don't understand yet. For a long time I kept the two halves separate. Engineering was the job, and music was the escape. I don't think that anymore. They're the same muscle worked from different angles.

Drumming is mostly restraint. The hard part isn't the fill everyone notices. It's the discipline to leave space, to serve the song instead of your own ego, to keep time when keeping time is the least interesting thing you could be doing. That's also most of senior engineering. The best technical work I've done was usually the most boring-looking. The thing I didn't build. The cleverness I left out. The simple solution I had to talk myself into.

Both reward patience and punish ego. Both are improvisation on top of a structure you've internalized so deeply you stop thinking about it. And both have taught me the same thing. The people who are actually good make it look easy precisely because they spent years making it hard for themselves first.

So when I say "beyond the terminal," I don't really mean away from it. I mean the same instincts, pointed at something with no stack trace.`,
        image: '/posts/post-4.jpg',
        imageLabel: 'Beyond the Terminal'
    }
];

export const BlurbConfigs: BlurbConfig[] = [
    {
        id: '1',
        date: '2024-03-01',
        summary: 'Over a decade building web apps, backend services, and data pipelines that teams rely on. I write code the next engineer can understand and extend without a meeting.',
        description: 'Over a decade building web apps, backend services, and data pipelines that teams rely on. I care about maintainability, documentation, and writing code the next engineer can understand and extend without a meeting.',
        image: 'https://media.giphy.com/media/wswoMIxcP6Usxv8IJN/giphy.gif',
        imageLabel: 'I Build Things That Last',
        title: 'I Build Things That Last'
    },
    {
        id: '2',
        date: '2024-02-01',
        summary: 'Debugging is a craft. I chase production incidents and gnarly bugs with curiosity, tracing logs, metrics, and code until the root cause gives up.',
        description: 'Debugging is a craft. I approach production incidents and gnarly bugs with curiosity, tracing logs, metrics, and code until I find the root cause. Every hard bug is a lesson worth writing down.',
        image: 'https://media.giphy.com/media/pb2NDIcPTwNpu/giphy.gif',
        imageLabel: 'I Solve Hard Problems',
        title: 'I Solve Hard Problems'
    },
    {
        id: '3',
        date: '2024-01-01',
        summary: "Quality isn't optional. Observability, automated testing, and on-call readiness are first-class concerns. SLOs, dashboards, and runbooks matter as much as the feature itself.",
        description: "Quality isn't optional. I advocate for observability, automated testing, and on-call readiness as first-class concerns. SLOs, dashboards, and runbooks are as important as the feature itself.",
        image: 'https://media.giphy.com/media/GF3mIfPAXhVUSXFtkK/giphy.gif',
        imageLabel: 'Engineering Excellence',
        title: 'Engineering Excellence'
    }
];
