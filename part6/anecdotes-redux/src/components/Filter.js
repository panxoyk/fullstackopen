import React from 'react'
import { useDispatch } from 'react-redux'

import { changeFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const filter = event.target.value
        dispatch(changeFilter(filter))
    }

    return (
        <div>
            Filter: <input type='text' name='filter' onChange={handleChange} />
        </div>
    )
}

export default Filter