import { ComponentProps } from 'react';

export type ProgressBarProps = ComponentProps<'progress'> & {
    variant?:
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'success'
        | 'warning'
        | 'error'
        | 'info'
        | 'neutral';
    value: number;
};

const variantClasses = {
    neutral: 'progress-neutral',
    primary: 'progress-primary',
    secondary: 'progress-secondary',
    accent: 'progress-accent',
    info: 'progress-info',
    success: 'progress-success',
    warning: 'progress-warning',
    error: 'progress-error',
};

export default function ProgressBar({
    variant,
    value = 0,
    className = '',
    ...props
}: ProgressBarProps) {
    const variantClass = variant ? variantClasses[variant] : '';
    const classes = `progress ${variantClass} ${className}`.trim();
    return <progress {...props} className={classes} value={value} max="100"></progress>;
}
