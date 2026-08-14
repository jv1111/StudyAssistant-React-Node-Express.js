import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from "../redux/slice/authSlice";
import { getSessionAPI } from '../api/AuthApi';

const useSessionChecker = () => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        async function getSession() {
            const response = await getSessionAPI();
            if (response.success) {
                dispatch(login(response.user));//set loggedIn state to true and set the user
                setLoading(false);
            } else {
                dispatch(logout());//set loggedIn state to false and remove the user's data
                setLoading(false);
            }
        }
        getSession();
    }, [dispatch]);
    return { isLoading, auth }
}

export default useSessionChecker;
