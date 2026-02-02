import * as cls from "./Button.module.scss";
import type { ButtonHTMLAttributes, FC } from "react";

export const buttonTheme = {
  clear: "clear",
  invertedClear: "clear-inverted",
  background: "background",
  invertedBackground: "background-inverted",
} as const;

export const buttonSize = {
  m: "size-m",
  l: "size-l",
  xl: "size-xl",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: (typeof buttonTheme)[keyof typeof buttonTheme];
  size?: (typeof buttonSize)[keyof typeof buttonSize];
  square?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    disabled = false,
    className = "",
    children,
    theme = "clear",
    square = false,
    size = "size-m",
    ...otherProps
  } = props;

  return (
    <button
      type={"button"}
      disabled={disabled}
      className={`${cls.button} ${cls[theme]} ${cls[size]} ${square ? cls.square : ""} ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
