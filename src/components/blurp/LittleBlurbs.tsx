import { useState, type SyntheticEvent } from 'react';
import { motion, easeInOut } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlurbService } from '../../services/BlurbService';

const POSTS_PER_PAGE = 4;

// Neutral placeholder shown if a thumbnail fails to load, so a 404 never
// surfaces a broken-image icon.
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Crect width='56' height='56' fill='%23e2e8f0'/%3E%3C/svg%3E";

const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = 'true';
  img.src = FALLBACK_IMAGE;
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};


export default function LittleBlurbs() {
  const littleBlurbs = new BlurbService().getAllLittleBlurbs();
  const navigate = useNavigate();
  const location = useLocation();
  const [visibleCount, setVisibleCount] = useState<number>(
    (location.state as { visibleCount?: number } | null)?.visibleCount ?? POSTS_PER_PAGE
  );

  const visibleBlurbs = littleBlurbs.slice(0, visibleCount);
  const hasMore = visibleCount < littleBlurbs.length;

  const loadMore = () =>
    setVisibleCount((count) => Math.min(count + POSTS_PER_PAGE, littleBlurbs.length));

  return (
    <div className="space-y-6">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {visibleBlurbs.map((blurp) => (
          <motion.div
            key={blurp.id}
            className="h-full"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeInOut }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div
              className="block group h-full cursor-pointer"
              onClick={() => navigate('/post/' + blurp.id, { state: { scrollY: window.scrollY, visibleCount } })}
            >
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/40 hover:border-foreground/20">
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="space-y-0.5 flex-1">
                      <h2 className="font-semibold text-base leading-snug">{blurp.title}</h2>
                      <p className="text-xs text-muted-foreground">
                        {new Date(blurp.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </p>
                    </div>
                    <img
                      src={blurp.image}
                      alt={blurp.imageLabel}
                      loading="lazy"
                      onError={handleImageError}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {blurp.summary}
                  </p>
                  <p className="text-xs font-medium text-sky-500 group-hover:underline mt-3">
                    Continue reading...
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-muted-foreground">
          Showing {visibleBlurbs.length} of {littleBlurbs.length}
        </p>
        {hasMore && (
          <Button
            variant="outline"
            size="sm"
            onClick={loadMore}
            className="text-sky-500 border-sky-500/40 hover:bg-sky-500/10 hover:text-sky-500"
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}
