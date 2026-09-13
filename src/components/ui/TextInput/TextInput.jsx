export function TextInput({
  value = "",
  onChange,
  name,
  id,
  placeholder,
  className = "",
  ...props
}) {
  return (
    <input
      {...props}
      type="text"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`block min-w-0 outline-none ${className}`}
    />
  );
}
