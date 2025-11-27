import { Content } from '@/domain/models';
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

// 날짜 문자열을 YYYY-MM-DD 형식으로 변환
function toDateString(dateString: string): string {
    return dateString.split('T')[0];
}

// 두 날짜가 연속된 날짜인지 확인
function isConsecutiveDay(date1: string, date2: string): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1;
}

// 현재 연속 작성일 계산
export function calculateCurrentStreak(contents: Content[]): number {
    if (contents.length === 0) return 0;

    // 날짜별로 그룹화 (최신순)
    const dates = Array.from(new Set(contents.map((c) => toDateString(c.created_at)))).sort(
        (a, b) => b.localeCompare(a),
    );

    if (dates.length === 0) return 0;

    const today = getToday();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // 오늘 또는 어제 작성하지 않았으면 연속 기록 끊김
    if (dates[0] !== today && dates[0] !== yesterdayStr) {
        return 0;
    }

    let streak = 1;
    for (let i = 0; i < dates.length - 1; i++) {
        if (isConsecutiveDay(dates[i + 1], dates[i])) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

// 최장 연속 작성일 계산
export function calculateLongestStreak(contents: Content[]): number {
    if (contents.length === 0) return 0;

    // 날짜별로 그룹화 (오래된순)
    const dates = Array.from(new Set(contents.map((c) => toDateString(c.created_at)))).sort(
        (a, b) => a.localeCompare(b),
    );

    if (dates.length === 0) return 0;

    let longestStreak = 1;
    let currentStreak = 1;

    for (let i = 0; i < dates.length - 1; i++) {
        if (isConsecutiveDay(dates[i], dates[i + 1])) {
            currentStreak++;
            longestStreak = Math.max(longestStreak, currentStreak);
        } else {
            currentStreak = 1;
        }
    }

    return longestStreak;
}

// 평균 글자수 계산
export function calculateAvgWordCount(contents: Content[]): number {
    if (contents.length === 0) return 0;

    const totalChars = contents.reduce((sum, content) => sum + content.content.length, 0);
    return Math.round(totalChars / contents.length);
}
