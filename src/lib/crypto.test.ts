import { describe, it, expect, beforeAll } from 'vitest';
import { deriveKey, encrypt, decrypt, encryptText, decryptText, generateMasterKey } from './crypto';
import { pbkdf2 } from '@noble/hashes/pbkdf2.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { gcm } from '@noble/ciphers/aes.js';

const PBKDF2_ITERATIONS = 600000;
const KEY_LEN = 32;

const b64ToBytes = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

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
        it('비밀번호와 salt로 32바이트 raw key를 생성해야 함', async () => {
            const password = 'testPassword123';
            const salt = crypto.getRandomValues(new Uint8Array(16));

            const key = await deriveKey(password, salt);

            expect(key).toBeInstanceOf(Uint8Array);
            expect(key.length).toBe(32);
        });

        it('같은 비밀번호와 salt로 같은 키 바이트를 생성해야 함', async () => {
            const password = 'testPassword123';
            const salt = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

            const key1 = await deriveKey(password, salt);
            const key2 = await deriveKey(password, salt);

            expect(key1).toEqual(key2);
        });

        it('다른 비밀번호로 다른 키를 생성해야 함', async () => {
            const salt = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

            const key1 = await deriveKey('password1', salt);
            const key2 = await deriveKey('password2', salt);

            expect(key1).not.toEqual(key2);
        });
    });

    describe('encrypt / decrypt', () => {
        let key: Uint8Array;

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
        let key: Uint8Array;

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
            const encryptedDiary = await encryptText(originalText, masterKey);

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
            const decryptedDiary = await decryptText(encryptedDiary, finalMasterKey);
            expect(decryptedDiary).toBe(originalText);
        });
    });
});

describe('Web Crypto <-> @noble cross-decryption', () => {
    it('PBKDF2 결과 바이트가 두 라이브러리에서 동일해야 함', async () => {
        const password = 'testPassword';
        const salt = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

        const webKey = await deriveKey(password, salt);
        const nobleKey = pbkdf2(sha256, password, salt, {
            c: PBKDF2_ITERATIONS,
            dkLen: KEY_LEN,
        });

        expect(webKey).toEqual(nobleKey);
    });

    it('Web Crypto로 암호화한 텍스트를 @noble로 복호화할 수 있어야 함', async () => {
        const password = 'testPassword';
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const originalText = '한글 일기 + emoji 😀🎉 !@#$%';

        // 현재 구현으로 암호화
        const webKey = await deriveKey(password, salt);
        const encrypted = await encryptText(originalText, webKey);

        // @noble로 같은 키 유도 후 복호화
        const nobleKey = pbkdf2(sha256, password, salt, {
            c: PBKDF2_ITERATIONS,
            dkLen: KEY_LEN,
        });
        const decryptedBytes = gcm(nobleKey, b64ToBytes(encrypted.iv)).decrypt(
            b64ToBytes(encrypted.data),
        );

        expect(new TextDecoder().decode(decryptedBytes)).toBe(originalText);
    });

    it('@noble로 암호화한 데이터를 Web Crypto로 복호화할 수 있어야 함', async () => {
        const password = 'testPassword';
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const originalText = '역방향 검증 — 마이그레이션 후 새로 쓴 데이터';

        // @noble로 암호화
        const nobleKey = pbkdf2(sha256, password, salt, {
            c: PBKDF2_ITERATIONS,
            dkLen: KEY_LEN,
        });
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const ciphertext = gcm(nobleKey, iv).encrypt(new TextEncoder().encode(originalText));

        // 현재 구현(decryptText)으로 복호화 — 저장 포맷에 맞춰 base64 변환
        const webKey = await deriveKey(password, salt);
        const decrypted = await decryptText(
            {
                iv: btoa(String.fromCharCode(...iv)),
                data: btoa(String.fromCharCode(...ciphertext)),
            },
            webKey,
        );

        expect(decrypted).toBe(originalText);
    });

    it('encryption_keys 테이블 시나리오 — 기존 setup 데이터를 @noble로 unlock', async () => {
        // === 1) 기존 코드(Web Crypto)로 setup ===
        const password = 'mySecurePassword123';
        const passwordSalt = crypto.getRandomValues(new Uint8Array(16));
        const passwordKey = await deriveKey(password, passwordSalt);

        const masterKey = generateMasterKey();
        const encryptedMasterKey = await encrypt(masterKey, passwordKey); // DB 저장 포맷
        const verificationToken = await encryptText('VALID_KEY_V1', passwordKey);

        // === 2) 새 코드(@noble)로 unlock 시뮬레이션 ===
        const nobleKey = pbkdf2(sha256, password, passwordSalt, {
            c: PBKDF2_ITERATIONS,
            dkLen: KEY_LEN,
        });

        // verification_token 검증
        const tokenBytes = gcm(nobleKey, b64ToBytes(verificationToken.iv)).decrypt(
            b64ToBytes(verificationToken.data),
        );
        expect(new TextDecoder().decode(tokenBytes)).toBe('VALID_KEY_V1');

        // master key 복호화
        const recoveredMasterKey = gcm(nobleKey, b64ToBytes(encryptedMasterKey.iv)).decrypt(
            b64ToBytes(encryptedMasterKey.data),
        );
        expect(recoveredMasterKey).toEqual(masterKey);

        // === 3) 복호화한 master key로 일기 cross-decryption ===
        const diary = '오늘은 정말 좋은 하루였다.';
        const encryptedDiary = await encryptText(diary, masterKey);

        const decryptedDiaryBytes = gcm(recoveredMasterKey, b64ToBytes(encryptedDiary.iv)).decrypt(
            b64ToBytes(encryptedDiary.data),
        );
        expect(new TextDecoder().decode(decryptedDiaryBytes)).toBe(diary);
    });

    it('REAL: 옛 Web Crypto 코드로 만들어진 데이터를 새 코드가 복호화할 수 있어야 함', async () => {
        const password = 'testPassword';
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const originalText = '기존 DB에 저장된 일기 내용';

        // === 옛 Web Crypto 코드 흐름을 그대로 재현 ===
        const km = await crypto.subtle.importKey(
            'raw',
            new TextEncoder().encode(password),
            'PBKDF2',
            false,
            ['deriveKey'],
        );
        const oldCryptoKey = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt as BufferSource,
                iterations: PBKDF2_ITERATIONS,
                hash: 'SHA-256',
            },
            km,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt'],
        );
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const ct = new Uint8Array(
            await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv },
                oldCryptoKey,
                new TextEncoder().encode(originalText),
            ),
        );
        const oldEncrypted = {
            iv: btoa(String.fromCharCode(...iv)),
            data: btoa(String.fromCharCode(...ct)),
        };

        // === 새 코드로 복호화 ===
        const newKey = await deriveKey(password, salt);
        const decrypted = await decryptText(oldEncrypted, newKey);

        expect(decrypted).toBe(originalText);
    });

    it('잘못된 비밀번호로 @noble 복호화 시도하면 인증 태그 실패해야 함', async () => {
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const webKey = await deriveKey('correctPassword', salt);
        const encrypted = await encryptText('비밀 메시지', webKey);

        const wrongKey = pbkdf2(sha256, 'wrongPassword', salt, {
            c: PBKDF2_ITERATIONS,
            dkLen: KEY_LEN,
        });

        expect(() =>
            gcm(wrongKey, b64ToBytes(encrypted.iv)).decrypt(b64ToBytes(encrypted.data)),
        ).toThrow();
    });
});
