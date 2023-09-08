import styled from "styled-components";
import { darken } from "polished";
import Button from "./Button"; // Import the general Button

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
const StyledButton = styled(Button)<ButtonProps>`
  background-color: #FF5733;
  &:hover {
    background-color: ${darken(0.1, "#FF5733")}
`;

const ButtonDanger: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
> = (props) => {
  return <StyledButton {...props} />;
};

export default ButtonDanger;
