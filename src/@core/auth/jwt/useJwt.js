// ** JWT Service Import
import JwtService from './jwtService'

// ** Export Service as useJwt
export default function useJwt(axiosIns, jwtOverrideConfig) {
  const jwt = new JwtService(axiosIns, jwtOverrideConfig)

  return {
    jwt
  }
}
