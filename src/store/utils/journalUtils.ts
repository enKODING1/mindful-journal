import { Content } from '@/store/models';
import { getToday } from '@/lib/utils';

// 현재 시간을 기준으로 오늘인지 확인
export function isToday(dateString: string): boolean {
    const today = getToday();
    return dateString.startsWith(today);
}

// 오늘 작성한 일기가 있는지 확인
export function hasWrittenToday(contents: Content[]): boolean {
    const today = getToday();
    return contents.some((content) => content.created_at.startsWith(today));
}
