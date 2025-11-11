'use client';

import NextLink from 'next/link';
import { ComponentProps } from 'react';

export type LinkProps = Omit<ComponentProps<'a'>, 'href'> & {
    href: string;
    underline?: boolean;
    color?:
        | 'neutral'
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'success'
        | 'info'
        | 'warning'
        | 'error';
};

const colorClasses = {
    neutral: 'link-neutral',
    primary: 'link-primary',
    secondary: 'link-secondary',
    accent: 'link-accent',
    success: 'link-success',
    info: 'link-info',
    warning: 'link-warning',
    error: 'link-error',
};

const isExternalHref = (href: string) => /^https?:\/\//i.test(href);

export default function Link({
    href,
    underline = true,
    color = 'primary',
    className = '',
    ...props
}: LinkProps) {
    const underlineClass = underline ? 'link' : 'link-hover';
    const colorClass = colorClasses[color];
    const classes = `${underlineClass} ${colorClass} ${className}`.trim();

    if (isExternalHref(href)) {
        return (
            <a href={href} className={classes} {...props} target="_blank">
                {props.children}
            </a>
        );
    }

    return (
        <NextLink href={href} className={classes} {...props}>
            {props.children}
        </NextLink>
    );
}
