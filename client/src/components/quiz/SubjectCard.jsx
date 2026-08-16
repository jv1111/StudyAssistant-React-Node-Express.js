import { Link } from "react-router-dom";

const SubjectCard = ({ subject }) => {
  return (
    <Link to={`quiz/${subject._id}`} className="subject-card">
      <div className="subject-card-header">
        <h2>{subject._id}</h2>

        <span>Subject</span>
      </div>

      <hr />

      <p>View quizzes for this subject</p>
    </Link>
  );
};

export default SubjectCard;
