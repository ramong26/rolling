import styled from "styled-components";

import { ArrowLeft, ArrowRight } from "../../../assets/images/icon/IconIndex";

const ArrowButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid ${({ theme }) => theme.colors.grayScale[300]};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(4px);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale[100]};
  }
`;

const imageMap = {
  left: ArrowLeft,
  right: ArrowRight,
};

const ArrowButton = ({ direction = "left", onClick }) => {
  const IconComponent = imageMap[direction] || ArrowLeft;
  return (
    <ArrowButtonWrapper onClick={onClick}>
      <IconComponent
        style={{ width: 16, height: 16 }}
        role="img"
        aria-label={`${direction} arrow`}
      />
    </ArrowButtonWrapper>
  );
};

export default ArrowButton;
