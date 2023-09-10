import styled from "styled-components";

interface ButtonsContainerProps {
  styleProps?: React.CSSProperties;
}

const StyledButtonsContainer = styled.div<ButtonsContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
//  ${(props) => props.styleProps && css(props.styleProps)}

const ButtonsContainer: React.FC<
  ButtonsContainerProps & React.HTMLProps<HTMLDivElement>
> = ({ children, styleProps, ...props }) => {
  return (
    <StyledButtonsContainer style={styleProps} {...props}>
      {children}
    </StyledButtonsContainer>
  );
};

export default ButtonsContainer;
