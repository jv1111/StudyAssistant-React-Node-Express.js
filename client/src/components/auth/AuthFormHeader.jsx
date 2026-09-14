import Eyebrow from "../common/Eyebrow";

const AuthFormHeader = ({ eyebrow, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <Eyebrow>{eyebrow}</Eyebrow>

      <h2 className="mt-3v font-bold sm:font-extrabold tracking-tight text-foreground text-3xl">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
};

export default AuthFormHeader;
