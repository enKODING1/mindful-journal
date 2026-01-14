import Image from 'next/image';
import { getMoodImage, getMoodLabel, Mood } from '@/domain/models';
import ProgressBar from '../atom/ProgressBar';

export type MoodStatProps = {
    mood: Mood;
    value: number;
};

export default function MoodStat({ mood, value }: MoodStatProps) {
    return (
        <div className="flex flex-row justify-between w-80 items-center">
            <span className="w-40 p-1 flex items-center gap-2">
                <Image
                    src={getMoodImage(mood)}
                    alt={mood}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                />
                {getMoodLabel(mood)}{' '}
            </span>
            <ProgressBar variant="primary" value={value} />
            <span className="w-40 p-1">8회 (33%)</span>
        </div>
    );
}
