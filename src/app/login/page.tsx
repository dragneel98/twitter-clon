import AuthButtonServer from "../components/AuthButton-server";

export default function Login() {
  return (
    <section className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-xl font-bold"> Inicia Sesion</h1>
        <AuthButtonServer></AuthButtonServer>
    </section>
  )
}
