import styled from "styled-components";
import { darken } from "polished";

interface ButtonProps {
  color?: string;
  backgroundColor?: string;
  border?: string;
  padding?: string;
  fontSize?: string;
  margin?: string;
  danger?: boolean; // Added this line
}

// all values can be set to css values defined in the main style css file
const StyledButton = styled.button<ButtonProps>`
  color: ${(props) => props.color || (props.danger ? "#FFFFFF" : "#FFFFFF")};
  background-color: ${(props) =>
    props.backgroundColor || (props.danger ? "#FF5733" : "#007BFF")};
  border: ${(props) => props.border || "none"};
  padding: ${(props) => props.padding || "10px 20px"};
  font-size: ${(props) => props.fontSize || "16px"};
  cursor: pointer;
  border-radius: 4px;
  margin: ${(props) => props.margin || "0"};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.backgroundColor
        ? darken(0.1, props.backgroundColor)
        : props.danger
        ? darken(0.1, "#FF5733")
        : darken(0.1, "#007BFF")};
  }
`;

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
> = (props) => {
  return <StyledButton {...props} />;
};

export default Button;
