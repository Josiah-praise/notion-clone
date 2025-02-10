import { User } from './types'
import 'firebase'
declare global {
    interface CustomJwtSessionClaims extends User
}

declare global 