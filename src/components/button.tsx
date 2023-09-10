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
  color: ${(props) => props.color || "#FFFFFF"};
  background-color: ${(props) => props.backgroundColor || "#2cabd3"};
  border: ${(props) => props.border || "none"};
  padding: ${(props) => props.padding || "10px 20px"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
  min-width: 80px;
  min-height: 40px;
  margin: ${(props) => props.margin || "0"};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.backgroundColor
        ? darken(0.1, props.backgroundColor)
        : darken(0.1, "#1e94ba")};
  }
`;

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
> = ({ ...props }) => {
  return <StyledButton {...props} />;
};

export default Button;
