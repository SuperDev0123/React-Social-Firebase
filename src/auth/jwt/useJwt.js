// ** Core JWT Import
import useJwt from '@src/@core/auth/jwt/useJwt'
import axios from '@src/utility/axios'
const { jwt } = useJwt(axios, {})

export default jwt
