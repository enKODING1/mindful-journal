import { getMoodEmoji, getMoodLabel, Mood } from '@/store/models';
import ProgressBar from '../atom/ProgressBar';

export type MoodStatProps = {
    mood: Mood;
    value: number;
};

export default function MoodStat({ mood, value }: MoodStatProps) {
    return (
        <div className="flex flex-row justify-between w-80 items-center">
            <span className="w-40 p-1">
                {getMoodEmoji(mood)} {getMoodLabel(mood)}{' '}
            </span>
            <ProgressBar variant="primary" value={value} />
            <span className="w-40 p-1">8회 (33%)</span>
        </div>
    );
}
