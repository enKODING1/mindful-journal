import { Content, MoodStat, Mood } from '@/domain/models';

export type Period = 'week' | 'month' | 'year' | 'all';

// 브라우저의 timezone을 자동 감지해 UTC 타임스탬프를 로컬 날짜(YYYY-MM-DD)로 변환
function toLocalDateString(utcString: string, timeZone: string): string {
    return new Intl.DateTimeFormat('en-CA', { timeZone }).format(new Date(utcString));
}

function getTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// 현재 시간을 기준으로 오늘인지 확인
export function isToday(dateString: string): boolean {
    const timeZone = getTimeZone();
    const todayLocal = new Intl.DateTimeFormat('en-CA', { timeZone }).format(new Date());
    return toLocalDateString(dateString, timeZone) === todayLocal;
}

// 오늘 작성한 일기가 있는지 확인 (클라이언트에서 호출 시 사용자 timezone 자동 적용)
export function hasWrittenToday(contents: Content[]): boolean {
    const timeZone = getTimeZone();
    const todayLocal = new Intl.DateTimeFormat('en-CA', { timeZone }).format(new Date());
    return contents.some(
        (content) => toLocalDateString(content.created_at, timeZone) === todayLocal,
    );
}

// UTC 타임스탬프를 로컬 날짜(YYYY-MM-DD)로 변환
function toDateString(dateString: string): string {
    return toLocalDateString(dateString, getTimeZone());
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

    const timeZone = getTimeZone();
    const fmt = new Intl.DateTimeFormat('en-CA', { timeZone });
    const today = fmt.format(new Date());
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = fmt.format(yesterday);

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
