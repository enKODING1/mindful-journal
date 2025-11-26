// 현재 날짜를 YYYY-MM-DD 형식으로 변환
export function getToday(): string {
    return new Date().toISOString().split('T')[0];
}

// 날짜를 YYYY-MM-DD 형식으로 변환
export function formatJournalDate(dateString: string | Date): string {
    if (typeof dateString === 'string') {
        return new Date(dateString).toISOString().split('T')[0];
    }
    return dateString.toISOString().split('T')[0];
}

// 일기 카드에 표시할 날짜 형식
export function getJournalCardDate(dateString: string): string {
    return new Date(dateString).toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}

// 일기 상세 페이지에 표시할 날짜 형식
export function formatJournalDetailDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
