import { useContext } from 'react'
import CustomeContext from './CumstoContext'

const useCustomeContext = ()=>{

    return useContext( CustomeContext )

}

export default useCustomeContext;