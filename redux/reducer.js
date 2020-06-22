const initial = {
    data: {
        name: 'Rezaa',
        lastName: '',
        mobile: '',
        phone: '',
        address: '',
        gender: ''
    },
    receivedData: {
        name: 'Reza',
        lastName: 'Ghovati',
        address: 'their home',
        mobile: '09107780374'

    }
}

const reducer = ( state = initial, action ) => {
    switch ( action.type ) {
        case 'PERSONAL_INFO':
            return {
                ...state,
                data: action.payload
            }

        case 'RECEIVED_DATA':
            return {
                ...state,
                receivedData: action.payload
            }

        default:
            return state
    }
}

export default reducer