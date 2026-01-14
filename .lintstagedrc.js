module.exports = {
    // Storybook 예제 파일 제외
    'src/stories/**': () => [],
    // TypeScript/JavaScript 파일 (Storybook 파일 제외)
    '*.{ts,tsx,js,jsx}': (filenames) => {
        const filtered = filenames.filter((file) => !file.includes('src/stories/'));
        if (filtered.length === 0) {
            return [];
        }
        // 각 파일을 개별적으로 처리하여 충돌 방지
        return filtered.flatMap((file) => [`eslint --fix "${file}"`, `prettier --write "${file}"`]);
    },
    // JSON, Markdown, CSS 파일
    '*.{json,md,css}': (filenames) => {
        return filenames.map((file) => `prettier --write "${file}"`);
    },
};
