import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(callback: () => void, options?: IntersectionObserverInit) {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);

            if (entry.isIntersecting) {
                callback();
            }
        }, options);

        observer.observe(target);

        return () => {
            observer.disconnect();
        };
    }, [callback, options]);

    return { targetRef, isIntersecting };
}
