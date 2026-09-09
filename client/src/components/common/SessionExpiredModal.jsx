import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FeedbackModal from "../common/FeedbackModal";
import { logout } from "../../redux/slice/authSlice";

const SessionExpiredModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionExpired = useSelector((state) => state.auth.sessionExpired);

  const handleConfirm = () => {
    dispatch(logout());
    navigate("/auth", { replace: true });
  };

  return (
    <FeedbackModal
      isOpen={sessionExpired}
      type="warning"
      title="Session expired"
      message="Your session has expired. Please log in again."
      onConfirm={handleConfirm}
    />
  );
};

export default SessionExpiredModal;
