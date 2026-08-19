import Eyebrow from "../common/Eyebrow";

const AuthFormHeader = ({ eyebrow, title, description }) => {
  return (
    <div className="text-center">
      <Eyebrow>{eyebrow}</Eyebrow>

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
};

export default AuthFormHeader;
