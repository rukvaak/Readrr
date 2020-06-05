const initialState = {
    items: [],
    loading: false,
    error: null,
    token:""
  };


const reducer = (state = initialState , action)=>{

    switch (action.type) {
        case 'POST_DATA_RESULT':
            return {
                ...state,
                loading: false,
                items: action.value
            }  
            case 'TEST':

            return {
                data:'test'
            }      
            case 'TOKEN':
                return{
                    token:action.value
                }
        default:
            return state
        }
    
}




export default reducer;