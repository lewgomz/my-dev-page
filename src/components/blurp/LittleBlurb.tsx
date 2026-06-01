import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { motion, easeInOut } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BlurbService } from '../../services/BlurbService';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { 
        duration: 0.4, 
        ease: easeInOut,
        delay 
    },
});

export default function LittleBlurb() {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const navState = location.state as { scrollY?: number; visibleCount?: number } | null;
    const savedScrollY = navState?.scrollY ?? 0;
    const savedVisibleCount = navState?.visibleCount;
    const blurbId = params.id as string;
    const blurb = new BlurbService().getLittleBlurb(blurbId);

    // Forward navigation carries the home page's scrollY in state; without a
    // reset the detail page renders at that offset. Start at the top on mount.
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    if (!blurb) {
        return (
            <div className="max-w-3xl mx-auto px-4 text-center py-16 pt-24 text-muted-foreground">
                Post not found.
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 space-y-4 pt-24">
            {/* Back button */}
            <motion.div {...fadeUp(0)}>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/', { state: { scrollY: savedScrollY, visibleCount: savedVisibleCount } })}
                    className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </motion.div>

            {/* Header — title left, image right */}
            <motion.div {...fadeUp(0.05)} className="flex items-center justify-between gap-4">
                <div className="flex-1 space-y-1 min-w-0">
                    <h1 className="text-3xl font-bold tracking-tight leading-tight">{blurb.title}</h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 shrink-0" />
                        <span>
                            {new Date(blurb.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                    </div>
                </div>

                {/* Accent image — compact, decorative */}
                <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-muted ring-1 ring-border">
                    <img
                        src={blurb.image}
                        alt={blurb.title}
                        onError={(event) => {
                            const img = event.currentTarget;
                            if (img.dataset.fallbackApplied) return;
                            img.dataset.fallbackApplied = 'true';
                            img.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%23e2e8f0'/%3E%3C/svg%3E";
                        }}
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>

            <motion.div {...fadeUp(0.1)}>
                <Separator />
            </motion.div>

            {/* Body */}
            <motion.div
                {...fadeUp(0.15)}
                className="space-y-4 text-base leading-relaxed text-foreground/90"
            >
                {blurb.description.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </motion.div>
        </div>
    );
}
