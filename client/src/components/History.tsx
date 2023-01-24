import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { resetAuthErrors } from '../redux/actions/auth.action'
import { addPath } from '../redux/actions/history.action'

export default function History() {
    const dispatch = useDispatch()
    const location = useLocation()
    
    // Resets all auth errors when the pathname changes
    // Adds the current path to the redux state
    useEffect(() => {
        dispatch(addPath(location.pathname + location.search))
        dispatch(resetAuthErrors())
    }, [location.pathname, location.search])

    return null
}
