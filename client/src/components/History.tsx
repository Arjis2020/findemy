import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { resetAuthErrors } from '../redux/reducers/auth.reducer'
import { addPath } from '../redux/reducers/history.reducer'
import { useAppDispatch } from '../redux/store'

export default function History() {
    const dispatch = useAppDispatch()
    const location = useLocation()
    
    // Resets all auth errors when the pathname changes
    // Adds the current path to the redux state
    useEffect(() => {
        dispatch(addPath(location.pathname + location.search))
        dispatch(resetAuthErrors())
    }, [location.pathname, location.search])

    return null
}
