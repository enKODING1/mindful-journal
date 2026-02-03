// import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

// const ALGORITHM = 'aes-256-gcm';
// const getKey = () => Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex');

// export const encrypt = (text: string): string => {
//     const key = getKey();
//     const iv = randomBytes(12);
//     const cipher = createCipheriv(ALGORITHM, key, iv);
//     let encrypted = cipher.update(text, 'utf8', 'hex');
//     encrypted += cipher.final('hex');

//     const authTag = cipher.getAuthTag().toString('hex');

//     return `${iv.toString('hex')}:${authTag}:${encrypted}`;
// };

// export const decrypt = (encryptedText: string): string => {
//     const key = getKey();

//     const [ivHex, authTagHex, encryptedHex] = encryptedText.split(':');

//     if (!ivHex || !authTagHex || !encryptedHex) {
//         throw new Error('암호화 데이터 형식이 잘못되었습니다.');
//     }

//     const iv = Buffer.from(ivHex, 'hex');
//     const authTag = Buffer.from(authTagHex, 'hex');

//     const decipher = createDecipheriv(ALGORITHM, key, iv);

//     decipher.setAuthTag(authTag);
//     let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');

//     return decrypted;
// };
// Web Crypto API 사용 (브라우저 전역 crypto 객체)

/**
 * 비밀번호를 암호화 키로 변환 (PBKDF2)
 */
export async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();

    // 비밀번호를 키 재료로 변환
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        'PBKDF2',
        false,
        ['deriveKey'],
    );

    // PBKDF2로 키 생성
    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 600000, // 60만 번 반복 (보안 강화)
            hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt'],
    );
}

/**
 * 데이터 암호화 (AES-GCM)
 */
export async function encrypt(
    data: Uint8Array,
    key: CryptoKey,
): Promise<{ iv: string; data: string }> {
    // 랜덤 IV 생성 (12바이트)
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // 암호화
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);

    // Base64로 인코딩해서 반환
    return {
        iv: btoa(String.fromCharCode(...iv)),
        data: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    };
}

/**
 * 데이터 복호화 (AES-GCM)
 */
export async function decrypt(
    encrypted: { iv: string; data: string },
    key: CryptoKey,
): Promise<Uint8Array> {
    // Base64 디코딩
    const iv = Uint8Array.from(atob(encrypted.iv), (c) => c.charCodeAt(0));
    const data = Uint8Array.from(atob(encrypted.data), (c) => c.charCodeAt(0));

    // 복호화
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);

    return new Uint8Array(decrypted);
}

/**
 * 텍스트 암호화 (편의 함수)
 */
export async function encryptText(
    text: string,
    key: CryptoKey,
): Promise<{ iv: string; data: string }> {
    const encoder = new TextEncoder();
    return encrypt(encoder.encode(text), key);
}

/**
 * 텍스트 복호화 (편의 함수)
 */
export async function decryptText(
    encrypted: { iv: string; data: string },
    key: CryptoKey,
): Promise<string> {
    const decrypted = await decrypt(encrypted, key);
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
}

/**
 * 마스터키 생성
 */
export function generateMasterKey(): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(32)); // 256비트
}
