const FormTextField = ({ label, name, ...inputProps }) => {
  const inputId = inputProps.id || name;

  return (
    <div className="form-field">
      <input
        id={inputId}
        name={name}
        placeholder={label}
        required
        {...inputProps}
      />
    </div>
  );
};

export default FormTextField;
