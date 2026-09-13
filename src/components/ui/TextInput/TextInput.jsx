export function TextInput({
  value = "",
  onChange,
  name,
  id,
  placeholder,
  inputRef,
  className = "",
  ...props
}) {
  return (
    <input
      ref={inputRef}
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
