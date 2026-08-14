import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login, logout } from "../redux/slice/authSlice";
import { getSessionAPI } from "../api/AuthApi";

const useSessionChecker = () => {
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const getSession = async () => {
      try {
        const response = await getSessionAPI();

        if (response.success) {
          dispatch(login(response.user));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, [dispatch]);

  return { isLoading, auth };
};

export default useSessionChecker;
