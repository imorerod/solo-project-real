const phoneNumbersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_APPROVED':
            return action.payload;
        default:
            return state;
    }
}

export default phoneNumbersReducer;