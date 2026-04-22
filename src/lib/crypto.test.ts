import { describe, it, expect, beforeAll } from 'vitest';
import { deriveKey, encrypt, decrypt, encryptText, decryptText, generateMasterKey } from './crypto';

describe('crypto', () => {
    describe('generateMasterKey', () => {
        it('32바이트(256비트) DEK를 생성해야 함', () => {
            const key = generateMasterKey();
            expect(key).toBeInstanceOf(Uint8Array);
            expect(key.length).toBe(32);
        });

        it('매번 다른 키를 생성해야 함', () => {
            const key1 = generateMasterKey();
            const key2 = generateMasterKey();
            expect(key1).not.toEqual(key2);
        });
    });

    describe('deriveKey', () => {
        it('비밀번호와 salt로 CryptoKey를 생성해야 함', async () => {
            const password = 'testPassword123';
            const salt = crypto.getRandomValues(new Uint8Array(16));

            const key = await deriveKey(password, salt);

            expect(key).toBeDefined();
            expect(key.type).toBe('secret');
            expect(key.algorithm.name).toBe('AES-GCM');
        });

        it('같은 비밀번호와 salt로 같은 키를 생성해야 함', async () => {
            const password = 'testPassword123';
            const salt = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

            const key1 = await deriveKey(password, salt);
            const key2 = await deriveKey(password, salt);

            // CryptoKey는 직접 비교할 수 없으므로, 같은 데이터를 암호화해서 비교
            const testData = new Uint8Array([1, 2, 3, 4, 5]);
            const iv = new Uint8Array(12);

            const encrypted1 = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key1, testData);
            const encrypted2 = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key2, testData);

            expect(new Uint8Array(encrypted1)).toEqual(new Uint8Array(encrypted2));
        });

        it('다른 비밀번호로 다른 키를 생성해야 함', async () => {
            const salt = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

            const key1 = await deriveKey('password1', salt);
            const key2 = await deriveKey('password2', salt);

            const testData = new Uint8Array([1, 2, 3, 4, 5]);
            const iv = new Uint8Array(12);

            const encrypted1 = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key1, testData);
            const encrypted2 = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key2, testData);

            expect(new Uint8Array(encrypted1)).not.toEqual(new Uint8Array(encrypted2));
        });
    });

    describe('encrypt / decrypt', () => {
        let key: CryptoKey;

        beforeAll(async () => {
            const salt = crypto.getRandomValues(new Uint8Array(16));
            key = await deriveKey('testPassword', salt);
        });

        it('데이터를 암호화하고 복호화할 수 있어야 함', async () => {
            const originalData = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

            const encrypted = await encrypt(originalData, key);
            const decrypted = await decrypt(encrypted, key);

            expect(decrypted).toEqual(originalData);
        });

        it('암호화된 결과는 iv와 data를 포함해야 함', async () => {
            const data = new Uint8Array([1, 2, 3]);

            const encrypted = await encrypt(data, key);

            expect(encrypted).toHaveProperty('iv');
            expect(encrypted).toHaveProperty('data');
            expect(typeof encrypted.iv).toBe('string');
            expect(typeof encrypted.data).toBe('string');
        });

        it('같은 데이터를 암호화해도 다른 결과가 나와야 함 (랜덤 IV)', async () => {
            const data = new Uint8Array([1, 2, 3, 4, 5]);

            const encrypted1 = await encrypt(data, key);
            const encrypted2 = await encrypt(data, key);

            expect(encrypted1.iv).not.toBe(encrypted2.iv);
            expect(encrypted1.data).not.toBe(encrypted2.data);
        });

        it('잘못된 키로 복호화하면 실패해야 함', async () => {
            const data = new Uint8Array([1, 2, 3, 4, 5]);
            const encrypted = await encrypt(data, key);

            const wrongSalt = crypto.getRandomValues(new Uint8Array(16));
            const wrongKey = await deriveKey('wrongPassword', wrongSalt);

            await expect(decrypt(encrypted, wrongKey)).rejects.toThrow();
        });
    });

    describe('encryptText / decryptText', () => {
        let key: CryptoKey;

        beforeAll(async () => {
            const salt = crypto.getRandomValues(new Uint8Array(16));
            key = await deriveKey('testPassword', salt);
        });

        it('텍스트를 암호화하고 복호화할 수 있어야 함', async () => {
            const originalText = '오늘은 정말 좋은 하루였다!';

            const encrypted = await encryptText(originalText, key);
            const decrypted = await decryptText(encrypted, key);

            expect(decrypted).toBe(originalText);
        });

        it('빈 문자열도 처리할 수 있어야 함', async () => {
            const originalText = '';

            const encrypted = await encryptText(originalText, key);
            const decrypted = await decryptText(encrypted, key);

            expect(decrypted).toBe(originalText);
        });

        it('긴 텍스트도 처리할 수 있어야 함', async () => {
            const originalText = '안녕하세요. '.repeat(1000);

            const encrypted = await encryptText(originalText, key);
            const decrypted = await decryptText(encrypted, key);

            expect(decrypted).toBe(originalText);
        });

        it('특수문자와 이모지도 처리할 수 있어야 함', async () => {
            const originalText = '테스트 😀🎉 특수문자 !@#$%^&*()';

            const encrypted = await encryptText(originalText, key);
            const decrypted = await decryptText(encrypted, key);

            expect(decrypted).toBe(originalText);
        });

        it('잘못된 키로 복호화하면 실패해야 함', async () => {
            const originalText = '비밀 메시지';
            const encrypted = await encryptText(originalText, key);

            const wrongSalt = crypto.getRandomValues(new Uint8Array(16));
            const wrongKey = await deriveKey('wrongPassword', wrongSalt);

            await expect(decryptText(encrypted, wrongKey)).rejects.toThrow();
        });
    });

    describe('전체 플로우 테스트', () => {
        it('DEK 생성 → 암호화 → 복호화 플로우가 동작해야 함', async () => {
            // 1. DEK 생성
            const masterKey = generateMasterKey();

            // 2. 비밀번호로 키 생성
            const password = 'mySecurePassword123';
            const salt = crypto.getRandomValues(new Uint8Array(16));
            const passwordKey = await deriveKey(password, salt);

            // 3. DEK 암호화
            const encryptedMasterKey = await encrypt(masterKey, passwordKey);

            // 4. DEK 복호화
            const decryptedMasterKey = await decrypt(encryptedMasterKey, passwordKey);

            expect(decryptedMasterKey).toEqual(masterKey);
        });

        it('비밀번호 변경 시나리오가 동작해야 함', async () => {
            const originalText = '중요한 일기 내용입니다.';

            // 1. 초기 설정
            const masterKey = generateMasterKey();
            const oldPassword = 'oldPassword123';
            const oldSalt = crypto.getRandomValues(new Uint8Array(16));
            const oldPasswordKey = await deriveKey(oldPassword, oldSalt);

            // 2. DEK와 일기 암호화
            const encryptedMasterKey = await encrypt(masterKey, oldPasswordKey);

            // DEK를 CryptoKey로 변환
            const masterCryptoKey = await crypto.subtle.importKey(
                'raw',
                masterKey as BufferSource,
                { name: 'AES-GCM' },
                false,
                ['encrypt', 'decrypt'],
            );
            const encryptedDiary = await encryptText(originalText, masterCryptoKey);

            // 3. 비밀번호 변경
            const newPassword = 'newPassword456';
            const newSalt = crypto.getRandomValues(new Uint8Array(16));
            const newPasswordKey = await deriveKey(newPassword, newSalt);

            // 기존 DEK 복호화 후 새 비밀번호로 재암호화
            const decryptedMasterKey = await decrypt(encryptedMasterKey, oldPasswordKey);
            const reEncryptedMasterKey = await encrypt(decryptedMasterKey, newPasswordKey);

            // 4. 새 비밀번호로 DEK 복호화 확인
            const finalMasterKey = await decrypt(reEncryptedMasterKey, newPasswordKey);
            expect(finalMasterKey).toEqual(masterKey);

            // 5. 일기 복호화 확인
            const finalMasterCryptoKey = await crypto.subtle.importKey(
                'raw',
                finalMasterKey as BufferSource,
                { name: 'AES-GCM' },
                false,
                ['encrypt', 'decrypt'],
            );
            const decryptedDiary = await decryptText(encryptedDiary, finalMasterCryptoKey);
            expect(decryptedDiary).toBe(originalText);
        });
    });
});
