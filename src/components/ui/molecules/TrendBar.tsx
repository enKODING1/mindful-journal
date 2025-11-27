import ProgressBar, { ProgressBarProps } from '../atom/ProgressBar';

export type TrendBarProps = {
    label: string;
    count: number;
    value: number;
    variant?: ProgressBarProps['variant'];
};

export default function TrendBar({ label, count, value, variant = 'success' }: TrendBarProps) {
    return (
        <div className="flex items-center gap-4 w-full">
            <span className="text-base font-medium w-16 flex-shrink-0">{label}</span>
            <ProgressBar variant={variant} value={value} className="flex-1" />
            <span className="text-sm text-base-content/70 w-16 text-right flex-shrink-0">
                {count}개
            </span>
        </div>
    );
}
