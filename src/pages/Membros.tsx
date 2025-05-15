import { useMetaSEO } from '@/hooks/useMetaSEO'
import MembrosPage from './member'

const Membros = () => {
  useMetaSEO('membros')
  return <MembrosPage />
}

export default Membros
