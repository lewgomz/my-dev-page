import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, ChevronDown } from 'lucide-react';

interface HeroSplashProps {
  /**
   * Scrolls to the section with the given id.
   */
  onJumpToSection: (id: 'about' | 'highlights' | 'experience' | 'posts') => void;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: 'easeOut' as const, delay },
});

const ringEntrance = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.15 },
};

/**
 * Full-bleed cinematic hero with scroll-driven animations:
 *  - Corners drift vertically at different parallax speeds (Option 3)
 *  - Ring + figure collapse like a closing iris (Option 4)
 *  - Everything reverses naturally on scroll back up
 */
export default function HeroSplash({ onJumpToSection }: HeroSplashProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // scrollYProgress: 0 when splash top aligns with viewport top,
  // 1 when splash bottom aligns with viewport top (= splash fully scrolled out)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // --- Option 3 enhanced: diagonal slide + parallax on corner anchors ---
  // Each corner slides off-canvas in the direction of its own corner, plus
  // a vertical parallax for staggered timing. Done with FIXED positioning so
  // the slide is actually visible (absolute positioning would let the corner
  // scroll out naturally before the slide can play). Direction map:
  //   top-left     → slides up + left
  //   top-right    → slides up + right
  //   bottom-left  → slides down + left
  //   bottom-right → slides down + right
  //   vertical nav → slides right (off the side)
  const topLeftX     = useTransform(scrollYProgress, [0, 0.7], ['0vw', '-45vw']);
  const topLeftY     = useTransform(scrollYProgress, [0, 0.7], ['0vh', '-20vh']);
  const topRightX    = useTransform(scrollYProgress, [0, 0.7], ['0vw', '45vw']);
  const topRightY    = useTransform(scrollYProgress, [0, 0.7], ['0vh', '-20vh']);
  const bottomLeftX  = useTransform(scrollYProgress, [0, 0.7], ['0vw', '-45vw']);
  const bottomLeftY  = useTransform(scrollYProgress, [0, 0.7], ['0vh', '25vh']);
  const bottomRightX = useTransform(scrollYProgress, [0, 0.7], ['0vw', '45vw']);
  const bottomRightY = useTransform(scrollYProgress, [0, 0.7], ['0vh', '25vh']);
  const verticalNavX = useTransform(scrollYProgress, [0, 0.7], ['0vw', '40vw']);

  // Opacity fade slightly behind the slide so the corner is still mostly
  // visible during the slide-out, not invisible halfway through.
  const cornerOpacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const chevronOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]); // fades fastest

  // --- Option B: figure rises out of frame + fades ---
  // No scaling (preserves the human portrait). Figure drifts upward and fades
  // to transparent — like the subject exiting the stage upward.
  const centerY       = useTransform(scrollYProgress, [0, 1], ['0vh', '-28vh']);
  const centerOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className="relative w-full min-h-screen overflow-hidden bg-hero-vignette flex items-center justify-center"
    >
      {/* Top-left: monogram + wordmark — slides up + left, fades */}
      <motion.div
        className="fixed top-6 left-6 sm:top-10 sm:left-10 z-20"
        style={{ x: topLeftX, y: topLeftY, opacity: cornerOpacity }}
      >
        <motion.div {...fadeUp(0.05)} className="flex items-center gap-3">
          <div
            aria-label="Lewgomz logo"
            role="img"
            className="h-14 w-14 sm:h-16 sm:w-16 bg-sky-400"
            style={{
              WebkitMaskImage: 'url(/lg-logo.png)',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: 'url(/lg-logo.png)',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
            }}
          />
          <span className="text-xs sm:text-sm font-semibold tracking-[0.4em] text-sky-400 uppercase">
            Lewgomz
          </span>
        </motion.div>
      </motion.div>

      {/* Top-right: stacked name display — slides up + right, fades */}
      <motion.div
        className="fixed top-6 right-6 sm:top-10 sm:right-10 text-right z-20 hidden sm:block"
        style={{ x: topRightX, y: topRightY, opacity: cornerOpacity }}
      >
        <motion.div {...fadeUp(0.12)}>
          <p className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.05em] text-sky-400 leading-none">
            LEWIS
          </p>
          <p className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.05em] text-sky-400 leading-none mt-1">
            GOMEZ
          </p>
        </motion.div>
      </motion.div>

      {/* Center: ring + figure — rises upward and fades on scroll out */}
      <motion.div
        className="relative z-10"
        style={{ opacity: centerOpacity, y: centerY }}
      >
        <motion.div
          {...ringEntrance}
          className="relative flex items-start justify-center h-72 w-72 sm:h-[20rem] sm:w-[20rem] md:h-[24rem] md:w-[24rem] lg:h-[60vh] lg:w-[60vh] xl:h-[65vh] xl:w-[65vh]"
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-full hero-ring pointer-events-none z-0"
          />
          <img
            src="/lew-cutout.png"
            alt="Lewis Gomez"
            className="relative z-10 h-[122%] w-auto object-contain object-top hero-cutout"
          />
        </motion.div>
      </motion.div>

      {/* Bottom-left: title block — slides down + left, fades */}
      <motion.div
        className="fixed bottom-10 left-6 sm:bottom-14 sm:left-10 z-20 max-w-[70%]"
        style={{ x: bottomLeftX, y: bottomLeftY, opacity: cornerOpacity }}
      >
        <motion.div {...fadeUp(0.35)}>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-tight">
            Software Development Engineer
          </p>
          <p className="text-base sm:text-lg font-medium tracking-[0.1em] text-muted-foreground mt-0.5">
            At <span className="font-bold text-sky-400 tracking-[0.15em]">AMAZON</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom-right: socials — slides down + right, fades */}
      <motion.div
        className="fixed bottom-10 right-6 sm:bottom-14 sm:right-10 z-20"
        style={{ x: bottomRightX, y: bottomRightY, opacity: cornerOpacity }}
      >
        <motion.div
          {...fadeUp(0.42)}
          className="flex items-center gap-3 sm:gap-4"
        >
          <a
            href="https://www.linkedin.com/in/lg-luisgomez/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-sky-400 transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/lewgomz"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-sky-400 transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://x.com/lewgomz/"
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
            className="text-muted-foreground hover:text-sky-400 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Right-edge: vertical in-page nav — slides off right, fades.
          Bigger text (12px) + multi-layer hover: scale, tracking expansion,
          color shift, accent bar growing from above the label. */}
      <motion.nav
        aria-label="Section navigation"
        className="fixed right-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-14"
        style={{ x: verticalNavX, opacity: cornerOpacity }}
      >
        <motion.div {...fadeIn(0.55)} className="flex flex-col items-center gap-14">
          {(['highlights', 'experience', 'posts'] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onJumpToSection(id)}
              style={{ writingMode: 'vertical-rl' }}
              className="group relative whitespace-nowrap text-xs font-semibold tracking-[0.45em] uppercase text-muted-foreground
                         hover:text-sky-400 hover:tracking-[0.65em] hover:scale-110
                         transition-all duration-300 ease-out cursor-pointer
                         [text-shadow:0_0_0_transparent] hover:[text-shadow:0_0_12px_rgba(14,165,233,0.45)]"
            >
              {/* Accent bar — slides in above the label on hover */}
              <span
                aria-hidden
                style={{ writingMode: 'horizontal-tb' }}
                className="absolute -top-5 left-1/2 -translate-x-1/2 h-px w-0 bg-sky-400
                           group-hover:w-8 group-hover:shadow-[0_0_8px_rgba(14,165,233,0.6)]
                           transition-all duration-300 ease-out"
              />
              {/* Small dot indicator — fades in below the label on hover */}
              <span
                aria-hidden
                style={{ writingMode: 'horizontal-tb' }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-sky-400
                           opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100
                           transition-all duration-300 ease-out"
              />
              {id}
            </button>
          ))}
        </motion.div>
      </motion.nav>

      {/* Scroll-down chevron — fades fastest, no slide */}
      <motion.button
        type="button"
        onClick={() => onJumpToSection('about')}
        aria-label="Scroll to content"
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-20 text-muted-foreground/60 hover:text-sky-400 transition-colors"
        style={{ opacity: chevronOpacity }}
      >
        <motion.span {...fadeIn(0.8)} className="block">
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.span>
      </motion.button>
    </section>
  );
}
