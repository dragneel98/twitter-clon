import AuthButtonServer from "./AuthButton-server"
import { users } from "../types/users"

export default function ({user}:any) {

  return (
    <div>
        <AuthButtonServer></AuthButtonServer>
    </div>
  )
}