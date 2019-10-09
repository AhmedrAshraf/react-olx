import fire from '../../fire/fire';
import history from '../../apphistory';


export function signup(name, email, password) {
    return (dispatch) => {
        dispatch({ type: 'CHANGE_LOADER' })

        fire.auth().createUserWithEmailAndPassword(email, password)
            
            .then((user) => {
                dispatch({ type: "LOGGEDIN_USER", payload: { name, email, uid: user.user.uid } })
                fire.firestore().collection("users").add({
                    name,
                    email,
                    uid: user.user.uid,
                }).then(()=>{
                history.push('./home')
                })
            })
            .catch((error) => {
                dispatch({ type: 'SHOW_ERROR', payload: error.message });
                dispatch({ type: 'CHANGE_LOADER' });
                dispatch(removeError());
            })
    }
}





export function signin(email, password) {
    return (dispatch) => {
        dispatch({ type: 'CHANGE_LOADER' })

        fire.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch({ type: "LOGGEDIN_USER", payload: { email: user.user.email, uid: user.user.uid } })
                localStorage.setItem('uid', user.user.uid)
                history.push('./home')
            })
            .catch((error) => {
                dispatch({ type: 'SHOW_ERROR', payload: error.message });
                dispatch({ type: 'CHANGE_LOADER' });
                dispatch(removeError());
            })
    }
}


function removeError() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({ type: "REMOVE_ERROR" });
        }, 5000);
    }
}
