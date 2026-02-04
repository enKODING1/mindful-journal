import { Content, MoodStat, Mood } from '@/domain/models';
import { getToday } from '@/lib/utils';

export type Period = 'week' | 'month' | 'year' | 'all';

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

    const totalChars = contents.reduce(
        (sum, content) => sum + (content.decryptedContent?.length ?? 0),
        0,
    );
    return Math.round(totalChars / contents.length);
}

// 기간별 필터링
export function filterByPeriod(contents: Content[], period: Period): Content[] {
    if (period === 'all') return contents;

    const now = new Date();
    let startDate: Date;

    switch (period) {
        case 'week':
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
        case 'month':
            startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 1);
            break;
        case 'year':
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear() - 1);
            break;
        default:
            return contents;
    }

    return contents.filter((c) => new Date(c.created_at) >= startDate);
}

// 감정분포 별 비율 계산
export function calculateMoodDistribution(contents: Content[]): MoodStat[] {
    const moodCount = contents.reduce(
        (acc, content) => {
            const mood = content.mood;
            if (mood) {
                acc[mood] = (acc[mood] || 0) + 1;
            }
            return acc;
        },
        {} as Record<string, number>,
    );

    const total = Object.values(moodCount).reduce((sum, count) => sum + count, 0);
    const moodStats: MoodStat[] = Object.entries(moodCount).map(([mood, count]) => ({
        mood: mood as Mood, // Type assertion
        count,
        percentage: Math.round((count / total) * 100),
    }));

    return moodStats;
}

// 월별 추이 계산
export function calculateMonthlyTrend(contents: Content[]): Array<{
    month: string;
    count: number;
    percentage: number;
}> {
    if (contents.length === 0) return [];

    // 월별로 그룹화 (YYYY-MM 형식)
    const monthlyCount = contents.reduce(
        (acc, content) => {
            const month = content.created_at.substring(0, 7); // "2025-11"
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>,
    );

    // 최댓값 찾기 (퍼센티지 계산용)
    const maxCount = Math.max(...Object.values(monthlyCount));

    // 월별 데이터 생성 (최신순 정렬)
    const monthlyData = Object.entries(monthlyCount)
        .map(([month, count]) => ({
            month,
            count,
            percentage: Math.round((count / maxCount) * 100),
        }))
        .sort((a, b) => b.month.localeCompare(a.month));

    return monthlyData;
}
