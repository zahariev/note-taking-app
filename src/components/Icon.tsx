import styled from "styled-components";

const StyledImg = styled.img`
  width: 80px;
  height: 50px;
  cursor: pointer;
`;

const Icon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  ...props
}) => {
  return <StyledImg {...props} />;
};

export default Icon;
