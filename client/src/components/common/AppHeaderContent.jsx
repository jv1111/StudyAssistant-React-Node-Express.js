import Badge from "./Badge";

const AppHeaderContent = ({ eyebrow, title, description }) => {
  return (
    <div className="flex flex-col items-start text-left">
      {eyebrow && (
        <Badge variant="primary" shape="rounded">
          {eyebrow}
        </Badge>
      )}

      <h1 className="mt-2.5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>

      {description && (
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
          {description}
        </p>
      )}
    </div>
  );
};

export default AppHeaderContent;
