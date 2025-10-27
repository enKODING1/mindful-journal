import { Content } from '@/store/models';

/**
 * 현재 날짜를 YYYY-MM-DD 형식으로 변환
 */
export function getToday(): string {
    return new Date().toISOString().split('T')[0];
}

/**
 * 현재 시간을 기준으로 오늘인지 확인
 */
export function isToday(dateString: string): boolean {
    const today = getToday();
    return dateString.startsWith(today);
}

/**
 * 오늘 작성한 일기가 있는지 확인
 */
export function hasWrittenToday(contents: Content[]): boolean {
    const today = getToday();
    return contents.some((content) => content.created_at.startsWith(today));
}

/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 */
export function formatJournalDate(dateString: string): string {
    return new Date(dateString).toISOString().split('T')[0];
}

/**
 * 일기 카드에 표시할 날짜 형식
 */
export function getJournalCardDate(dateString: string): string {
    return new Date(dateString).toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * 일기 상세 페이지에 표시할 날짜 형식
 */
export function formatJournalDetailDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
