import { useParams, useNavigate } from 'react-router-dom';
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
    const blurbId = params.id as string;
    const blurb = new BlurbService().getLittleBlurb(blurbId);

    if (!blurb) {
        return (
            <div className="max-w-3xl mx-auto px-4 text-center py-16 text-muted-foreground">
                Post not found.
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 space-y-4">
            {/* Back button */}
            <motion.div {...fadeUp(0)}>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/my-dev-page')}
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
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>

            <motion.div {...fadeUp(0.1)}>
                <Separator />
            </motion.div>

            {/* Body */}
            <motion.p
                {...fadeUp(0.15)}
                className="text-base leading-relaxed text-foreground/90"
            >
                {blurb.description}
            </motion.p>
        </div>
    );
}
