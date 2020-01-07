export const logManager = () => {
    return{
        type: 'SIGN_IN'
    }
}

export const increment = (number) => {
    return{
        type: 'INCREMENT',
        payload: number
    }
}

export const decrement = () => {
    return{
        type: 'DECREMENT'
    }
}


export const selectMarker = (id) => {
    return{
        type: 'SELECT_GUARDS',
        payload: id
    }
}