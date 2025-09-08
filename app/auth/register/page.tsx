import { createClient } from '@/app/utils/supabase/server';

export default function RegisterPage() {
    const signUpNewUser = async (formdata: FormData) => {
        'use server';
        const email = formdata.get('email')?.toString();
        const password = formdata.get('password')?.toString();
        const supabaseClient = await createClient();

        console.log(email, password);
        if (!(email && password)) {
            return;
        }

        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.log(email, password);
            console.error('회원가입 실패');
            console.error(error);
            console.log(data);
        } else {
            console.log('가입이 완료되었음 ');
            console.log(data);
        }
    };

    return (
        <div>
            <form action={signUpNewUser}>
                <div>
                    <section>email</section>
                    <textarea name="email"></textarea>
                    <section>password</section>
                    <textarea name="password"></textarea>
                </div>
                <button>가입</button>
            </form>
        </div>
    );
}
