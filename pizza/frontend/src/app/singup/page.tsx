import styles from '@/app/page.module.scss'
import logoImg from '/public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/services/api'
import { redirect } from 'next/navigation'

export default function Signup() {

    async function handleRegister(FormData: FormData) {
        "use server"

        const name = FormData.get("name")
        const email = FormData.get("email")
        const password = FormData.get("password")

        if (name === "" || email === "" || password === "") {
            console.log("Preencha todos os campos")
            return;
        }

        try {
            await api.post("/users", {
                name,
                email,
                password
            })
        } catch (err) {
            console.log("error")
            console.log(err)
        }

        redirect("/")
    }

    return (
        <>
            <div className={styles.containerCenter}>
                <Image
                    src={logoImg}
                    alt='Logo da pizzaria'
                />

                <section className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form action={handleRegister}>

                        <input
                            type='text'
                            required
                            name='name'
                            placeholder='Digite seu nome....'
                            className={styles.input}
                        />
                        <input
                            type='email'
                            required
                            name='email'
                            placeholder='Digite seu email....'
                            className={styles.input}
                        />

                        <input
                            type='password'
                            required
                            name='password'
                            placeholder='Digite sua senha'
                            className={styles.input}
                        />

                        <button type='submit' className={styles.button}>
                            Cadastrar
                        </button>
                    </form>

                    <Link href='/' className={styles.text}>
                        Já possui conta ? Faça login!
                    </Link>

                </section>

            </div>
        </>
    )
}