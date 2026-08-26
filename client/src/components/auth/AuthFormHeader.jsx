// AuthFormHeader.jsx
import Eyebrow from "../common/Eyebrow";

const AuthFormHeader = ({ eyebrow, title, description }) => {
  return (
    <div className="text-center flex flex-col items-center">
      <Eyebrow>{eyebrow}</Eyebrow>

      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
};

export default AuthFormHeader;
