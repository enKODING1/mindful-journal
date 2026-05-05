import { gcm } from '@noble/ciphers/aes.js';

const PBKDF2_ITERATIONS = 600000;
const KEY_LEN_BITS = 256;

/**
 * 비밀번호를 32바이트 raw key로 변환 (PBKDF2-SHA256, Web Crypto 네이티브)
 */
export async function deriveKey(password: string, salt: Uint8Array): Promise<Uint8Array> {
    const encoder = new TextEncoder();

    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        'PBKDF2',
        false,
        ['deriveBits'],
    );

    const bits = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: salt as BufferSource,
            iterations: PBKDF2_ITERATIONS,
            hash: 'SHA-256',
        },
        keyMaterial,
        KEY_LEN_BITS,
    );

    return new Uint8Array(bits);
}

/**
 * 데이터 암호화 (AES-GCM, @noble/ciphers)
 */
export async function encrypt(
    data: Uint8Array,
    key: Uint8Array,
): Promise<{ iv: string; data: string }> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = gcm(key, iv).encrypt(data);

    return {
        iv: btoa(String.fromCharCode(...iv)),
        data: btoa(String.fromCharCode(...encrypted)),
    };
}

/**
 * 데이터 복호화 (AES-GCM, @noble/ciphers)
 */
export async function decrypt(
    encrypted: { iv: string; data: string },
    key: Uint8Array,
): Promise<Uint8Array> {
    const iv = Uint8Array.from(atob(encrypted.iv), (c) => c.charCodeAt(0));
    const data = Uint8Array.from(atob(encrypted.data), (c) => c.charCodeAt(0));

    return gcm(key, iv).decrypt(data);
}

/**
 * 텍스트 암호화 (편의 함수)
 */
export async function encryptText(
    text: string,
    key: Uint8Array,
): Promise<{ iv: string; data: string }> {
    const encoder = new TextEncoder();
    return encrypt(encoder.encode(text), key);
}

/**
 * 텍스트 복호화 (편의 함수)
 */
export async function decryptText(
    encrypted: { iv: string; data: string },
    key: Uint8Array,
): Promise<string> {
    const decrypted = await decrypt(encrypted, key);
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
}

/**
 * DEK 생성
 */
export function generateMasterKey(): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(32)); // 256비트
}
