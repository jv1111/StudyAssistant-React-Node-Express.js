import { useNavigate } from "react-router-dom";

const SubjectCard = ({ subject }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`quiz/${subject._id}`);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <button type="button" className="card-button" onClick={handleClick}>
        <div className="card content-card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start gap-2">
              <h5 className="card-title text-white mb-0">{subject._id}</h5>

              <span className="badge text-bg-primary">Subject</span>
            </div>

            <hr className="border-secondary my-3" />

            <p className="card-text text-secondary mb-0">
              View quizzes for this subject
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default SubjectCard;
