import { useEffect, useMemo, useState } from 'react';

export default function TrueFocus({
    sentence,
    manualMode = false,
    blurAmount = 5,
    borderColor = '#5227FF',
    animationDuration = 0.5,
    pauseBetweenAnimations = 1,
}) {
    const words = useMemo(() => {
        if (!sentence) return [];
        return String(sentence)
            .trim()
            .split(/\s+/)
            .filter(Boolean);
    }, [sentence]);

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (manualMode) return;
        if (words.length <= 1) return;

        const ms = Math.max(150, (animationDuration + pauseBetweenAnimations) * 1000);
        const id = window.setInterval(() => {
            setActiveIndex((i) => (i + 1) % words.length);
        }, ms);

        return () => window.clearInterval(id);
    }, [manualMode, words.length, animationDuration, pauseBetweenAnimations]);

    const activate = (idx) => {
        if (!manualMode) return;
        setActiveIndex(idx);
    };

    const transition = `${Math.max(0.05, animationDuration)}s`;

    return (
        <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
            {words.map((w, idx) => {
                const isActive = idx === activeIndex;
                return (
                    <span
                        key={`${w}-${idx}`}
                        onMouseEnter={() => activate(idx)}
                        className={
                            'relative inline-flex items-center rounded-md px-1.5 py-0.5 ' +
                            (manualMode ? 'cursor-pointer ' : '')
                        }
                        style={{
                            transition: `filter ${transition}, opacity ${transition}, transform ${transition}`,
                            filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
                            opacity: isActive ? 1 : 0.6,
                            transform: isActive ? 'translateY(0px)' : 'translateY(1px)',
                        }}
                    >
                        <span
                            className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full"
                            style={{
                                backgroundColor: borderColor,
                                opacity: isActive ? 1 : 0,
                                transition: `opacity ${transition}`,
                            }}
                            aria-hidden="true"
                        />
                        <span className="font-extrabold tracking-tight">{w}</span>
                    </span>
                );
            })}
        </span>
    );
}
