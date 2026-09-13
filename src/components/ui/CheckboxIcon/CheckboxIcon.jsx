import { Icon } from "@/components/ui/Icon";

export function CheckboxIcon({
  checked,
  onChange,
  ariaLabel,
  className = "",
}) {
  return (
    <label className={`icon-checkbox ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel}
      />

      <Icon
        name={checked ? "squareCheck" : "square"}
        aria-hidden="true"
      />
    </label>
  );
}
