import * as TYPE from './types';

export const updateLogin = (token, isLoggedIn,userID) => dispatch => {



    dispatch({
        type: TYPE.UPDATE_LOGIN,
        token: token,
        isLoggedIn:isLoggedIn,
        userID:userID
    });
}

export const deleteInfo = () => dispatch => {



    dispatch({
        type: TYPE.DELETE_DATA
    });
}
export const updateEmail = (email) => dispatch => {



    dispatch({
        type: TYPE.UPDATE_EMAIL,
        email:email
    });
}
