import ProgressBar from '../atom/ProgressBar';

export type TrendBarProps = {
    date: string;
    count: number;
    value: number;
};

export default function TrendBar({ date, count, value }: TrendBarProps) {
    return (
        <div className="flex flex-row justify-between w-80 items-center">
            <span className="w-40 p-1">{date}</span>
            <ProgressBar variant="primary" value={value} />
            <span className="w-40 p-1">{count}개</span>
        </div>
    );
}
