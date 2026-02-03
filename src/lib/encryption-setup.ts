import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { deriveKey, encrypt, decrypt, encryptText, decryptText, generateMasterKey } from './crypto';

/**
 * 암호화 설정 (신규 사용자)
 */
export async function setupEncryption(password: string): Promise<void> {
    const supabase = createClientComponentClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('로그인 정보가 없습니다');
    }

    const masterKey = generateMasterKey();

    const passwordSalt = crypto.getRandomValues(new Uint8Array(16));
    const passwordKey = await deriveKey(password, passwordSalt);
    const encryptedMasterKey = await encrypt(masterKey, passwordKey);
    const verificationToken = await encryptText('VALID_KEY_V1', passwordKey);

    const { error } = await supabase.from('encryption_keys').insert({
        user_id: user.id,
        password_salt: btoa(String.fromCharCode(...passwordSalt)),
        encrypted_master_key: encryptedMasterKey,
        verification_token: verificationToken,
    });

    if (error) {
        console.error('DB 저장 실패:', error);
        throw error;
    }

    const masterKeyBase64 = btoa(String.fromCharCode(...masterKey));
    sessionStorage.setItem('masterKey', masterKeyBase64);

    masterKey.fill(0);

    console.log('암호화 설정 완료!');
}

/**
 * 비밀번호 검증 및 마스터키 복호화 (기존 사용자)
 */
export async function verifyPasswordAndGetMasterKey(password: string): Promise<Uint8Array | null> {
    const supabase = createClientComponentClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('로그인 정보가 없습니다');
    }

    const { data: encData, error } = await supabase
        .from('encryption_keys')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (error || !encData) {
        console.error('암호화 정보 없음:', error);
        throw new Error('암호화 정보를 찾을 수 없습니다');
    }

    const salt = Uint8Array.from(atob(encData.password_salt), (c) => c.charCodeAt(0));
    const passwordKey = await deriveKey(password, salt);

    try {
        const decryptedToken = await decryptText(encData.verification_token, passwordKey);

        if (decryptedToken !== 'VALID_KEY_V1') {
            return null;
        }
    } catch (error) {
        console.log('비밀번호 틀림 (검증 실패)');
        return null;
    }
    try {
        const masterKey = await decrypt(encData.encrypted_master_key, passwordKey);

        console.log('마스터키 복호화 완료');

        const masterKeyBase64 = btoa(String.fromCharCode(...masterKey));
        sessionStorage.setItem('masterKey', masterKeyBase64);
        console.log('sessionStorage 저장 완료');

        console.log('비밀번호 검증 성공!');
        return masterKey;
    } catch (error) {
        console.error('마스터키 복호화 실패:', error);
        return null;
    }
}

/**
 * sessionStorage에서 마스터키 가져오기
 */
export function getMasterKeyFromSession(): Uint8Array | null {
    const keyBase64 = sessionStorage.getItem('masterKey');
    if (!keyBase64) return null;

    return Uint8Array.from(atob(keyBase64), (c) => c.charCodeAt(0));
}

/**
 * 마스터키로 일기 암호화
 */
export async function encryptDiary(content: string): Promise<{ iv: string; data: string }> {
    const masterKey = getMasterKeyFromSession();
    if (!masterKey) {
        throw new Error('마스터키가 없습니다');
    }

    // 마스터키를 CryptoKey로 변환
    const key = await crypto.subtle.importKey('raw', masterKey, { name: 'AES-GCM' }, false, [
        'encrypt',
    ]);

    return encryptText(content, key);
}

/**
 * 마스터키로 일기 복호화
 */
export async function decryptDiary(encrypted: { iv: string; data: string }): Promise<string> {
    const masterKey = getMasterKeyFromSession();
    if (!masterKey) {
        throw new Error('마스터키가 없습니다');
    }

    // 마스터키를 CryptoKey로 변환
    const key = await crypto.subtle.importKey('raw', masterKey, { name: 'AES-GCM' }, false, [
        'decrypt',
    ]);

    return decryptText(encrypted, key);
}
