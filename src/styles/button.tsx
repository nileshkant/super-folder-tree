import styled from "styled-components";
import {
  color,
  ColorProps,
  space,
  SpaceProps,
  fontSize,
  FontSizeProps,
  buttonStyle,
  variant,
} from "styled-system";

const buttonSize = variant({
  prop: "size",
  key: "buttonSizes",
});

export { buttonSize };

const theme = {
  colors: {
    custom: "#444",
    yellow: "yellow",
  },
  buttons: {
    primary: {
      color: "white",
      backgroundColor: "blue",
    },
    secondary: {
      color: "white",
      backgroundColor: "green",
    },
    text: {
      background: "transparent",
      color: "white",
    },
  },
  buttonSizes: {
    small: {
      fontSize: "15px",
      padding: `2px`,
    },
    medium: {
      fontSize: "18px",
      padding: `9px 20px`,
    },
    large: {
      fontSize: "22px",
      padding: `15px 30px`,
    },
  },
};
export { theme };

type BottonProps = SpaceProps &
  ColorProps &
  FontSizeProps & {
    variant?: "primary" | "secondary" | "text";
    size?: "small" | "medium" | "large";
  };
const Button = styled.button<BottonProps>`
  border: 0;
  outline: 0;
  vertical-align: bottom;
  cursor: pointer;
  ${color}
  ${space}
  ${fontSize}
  ${buttonStyle}
  &:hover {
    background-color: ${(p) => (p.variant === "text" ? "#444" : "inherit")};
    border-radius: ${(p) => (p.variant === "text" ? "5px" : "inherit")};
  }
`;
Button.defaultProps = {
  variant: "primary",
  backgroundColor: "blue",
  size: "medium",
};

export default Button;
