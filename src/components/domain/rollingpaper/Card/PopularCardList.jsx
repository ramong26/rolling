import "../../../../styles/GlobalStyles";
import { textStyle } from "../../../../styles/textStyle";
import styled from "styled-components";
import { useEffect, useState } from "react";
import recipientsService from "../../../../api/services/recipientsService";
import ArrowButton from "../../../common/Button/ArrowButton";
import { useNavigate } from "react-router-dom";

const BoneWrap = styled.div`
  width: 1160px;
  position: relative;
  overflow: hidden;

  }
`;

const BoneContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
  width: 100%;
  overflow: hidden;


`;

const Bone = styled.div`
  display: flex;
  gap: 20px;
  width: fit-content;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => props.scrollPosition}px);
  position: relative;

  
`;

const BackgroundWrap = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["bgColor", "backgroundImageURL"].includes(prop),
})`
  background-color: ${({ bgColor }) => bgColor || "#FFFFFF"};
  background-image: ${({ backgroundImageURL }) =>
    backgroundImageURL
      ? `linear-gradient(180deg, rgba(0, 0, 0, 0.54) 0%, rgba(0, 0, 0, 0.54) 100%), url(${backgroundImageURL})`
      : "none"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 275px;
  height: 260px;
  padding: 30px 24px;
  border-radius: 1rem;
  color: ${({ backgroundImageURL }) =>
    backgroundImageURL ? "#ffffff" : "#000000"};
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;

  &:hover {
    transform: scale(1);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: 767px) {
    width:208px;
    height:232px;
  }

`;

const TextDisplay = styled.div`
  display: flex;
  height: 36px;
  margin-bottom: 0.75rem;
`;

const ToText = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  margin-bottom: 0.75rem;
  height: 2.625rem;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 767px) {
    ${(props) => textStyle(18, 700)(props)}
    font-family: Pretendard;
    line-height:28px;
  }
`;

const WritedContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Avatar = styled.div`
  ${(props) => textStyle(12, 400)(props)}
  right: -6px;
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.grayScale[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -10px;
  margin-bottom: 0.75rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &:not(:has(img)) {
    background-color: white;
    color: ${({ theme }) => theme.colors.grayScale[800]};
  }
`;

const WriteCount = styled.div`
  ${(props) => textStyle(14, 700)(props)}
  font-weight: 700;

  @media (max-width: 767px) {
    ${(props) => textStyle(14, 700)(props)}
    font-family: Pretendard;
    line-height:20px;
  }
`;

const WriteCountDisplay = styled.div`
  display: flex;
  align-items: center;
  ${(props) => textStyle(16, 700)(props)}
`;

const WritedText = styled.div`
  font-size: 16px;
  font-weight: 600;

  @media (max-width: 767px) {
    ${(props) => textStyle(14, 400)(props)}
    font-family: Pretendard;
    line-height:20px;
  }
`;

const ArrowButtonDisplay = styled.div`
    align-items: center;
    z-index: 1;
    transition: opacity 0.3s ease;
}
`;
const LeftArrowButtonDisplay = styled(ArrowButtonDisplay)`
  display: ${({ show }) => (show ? "block" : "none")};
  position: absolute;
  left: 22.5rem;
  top: 28%;
  transform: translateY(0%);
  z-index: 1;
`;

const RightArrowButtonDisplay = styled(ArrowButtonDisplay)`
  display: ${({ show }) => (show ? "block" : "none")};
  position: absolute;
  right: 22.5rem;
  top: 28%;
  transform: translateY(0%);
  z-index: 1;
`;
const TopEmojisContainer = styled.div`
  display: flex;
  gap: 8px;
  @media (max-width: 767px) {
    padding: 0 4px;
    
  }
`;

const TopEmojiItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 36px;
  border-radius: 32px;
  background-color: rgba(0, 0, 0, 0.54);
  color: white;
  padding: 8px 12px;
  gap: 2px;
  font-size: 20px;
  text-align: center;

  @media (max-width: 767px) {
    width: 46px;
    height: 32px;
    
  }
`;
const EmojiWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
`;

const EmojiDiv = styled.div`
  position: relative;
  margin-top: 2rem;
  padding-top: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  height: 80px;
  width: 100%;
  box-sizing: border-box;
`;
const EmojiImage = styled.span`
  font-size: 20px;
`;

const EmojiCount = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

function PopularCardList() {
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const cardWidth = 295;
  const navigate = useNavigate();
  const colorMap = {
    beige: "#FFE2AD",
    purple: "#ECD9FF",
    blue: "#B1E4FF",
    green: "#D0F5C3",
  };

  const isMobile = window.innerWidth <= 1199; // 1199px 이하인지 확인

  useEffect(() => {
    const loadRecipients = async () => {
      try {
        const response = await recipientsService.getRecipients(
          "/14-8/recipients/"
        );
        const sortedRecipients = response.data.results.sort(
          (a, b) => b.messageCount - a.messageCount
        );

        const updatedRecipients = sortedRecipients.map((recipient) => {
          const topReactions = recipient.topReactions.slice(0, 3);
          const images = recipient.recentMessages?.slice(0, 3) || [];
          const imageUrls = images
            .map((msg) => msg.profileImageURL)
            .filter(Boolean);

          return {
            ...recipient,
            topReactions,
            profileImages: imageUrls,
          };
        });

        setSelectedRecipients(updatedRecipients);
      } catch (error) {
        console.error("받는 사람 데이터를 가져오지 못했습니다:", error);
      }
    };

    loadRecipients();
  }, []);

  const handleNext = () => {
    const maxScroll = -(selectedRecipients.length * cardWidth - 1160);
    setScrollPosition((prev) =>
      prev > maxScroll ? prev - 2 * cardWidth : maxScroll
    );
  };

  const handlePrev = () => {
    setScrollPosition((prev) => (prev < 0 ? prev + 2 * cardWidth : 0));
  };

  const handleCardClick = (id) => {
    navigate(`/post/${id}`);
  };

  const showLeftButton = scrollPosition !== 0;
  const showRightButton =
    scrollPosition > -(selectedRecipients.length * cardWidth - 1160);

  const handleMouseDown = (e) => {
    if (!isMobile) return; // 모바일 화면에서만 드래그 시작

    setIsDragging(true);
    setStartPosition(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isMobile) return;

    const offset = e.clientX - startPosition;
    setDragOffset(offset); // 드래그 이동 값 계산
  };

  const handleMouseUp = () => {
    if (!isDragging || !isMobile) return;

    setIsDragging(false);
    setScrollPosition((prev) => prev + dragOffset); // 드래그 후 새로운 scrollPosition 설정
    setDragOffset(0);
  };

  useEffect(() => {
    if (isMobile) {
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isMobile, isDragging, dragOffset, startPosition]);

  return (
    <>
      <LeftArrowButtonDisplay show={showLeftButton}>
        <ArrowButton
          direction="left"
          onClick={handlePrev}
          disabled={scrollPosition === 0}
        />
      </LeftArrowButtonDisplay>
      <BoneWrap>
        <BoneContainer>
          <Bone
            scrollPosition={scrollPosition}
            onMouseDown={handleMouseDown} // Mouse down 이벤트 추가
            onMouseMove={handleMouseMove} // Mouse move 이벤트 추가
            onMouseUp={handleMouseUp} // Mouse up 이벤트 추가
          >
            {selectedRecipients.map((recipient, index) => (
              <BackgroundWrap
                key={index}
                bgColor={colorMap[recipient.backgroundColor] || "#FFFFFF"}
                backgroundImageURL={recipient.backgroundImageURL || null}
                onClick={() => handleCardClick(recipient.id)}
              >
                <TextDisplay>
                  <ToText>
                    To.
                    {recipient.name === "Unknown"
                      ? "이름 없음"
                      : recipient.name}
                  </ToText>
                </TextDisplay>
                <WritedContainer>
                  {recipient.profileImages?.slice(0, 3).map((url, i) => (
                    <Avatar key={i}>
                      <img src={url} alt={`프로필 이미지 ${i + 1}`} />
                    </Avatar>
                  ))}
                  {recipient.messageCount > 3 && (
                    <Avatar>+{recipient.messageCount - 3}</Avatar>
                  )}
                </WritedContainer>
                <WriteCountDisplay>
                  <WriteCount>{recipient.messageCount}</WriteCount>
                  <WritedText>명이 작성했어요!</WritedText>
                </WriteCountDisplay>

                <EmojiWrapper>
                  <EmojiDiv>
                    <TopEmojisContainer>
                      {recipient.topReactions.map(({ emoji, count }, i) => (
                        <TopEmojiItem key={i}>
                          <EmojiImage>{emoji}</EmojiImage>
                          <EmojiCount>{count}</EmojiCount>
                        </TopEmojiItem>
                      ))}
                    </TopEmojisContainer>
                  </EmojiDiv>
                </EmojiWrapper>
              </BackgroundWrap>
            ))}
          </Bone>
        </BoneContainer>
      </BoneWrap>
      <RightArrowButtonDisplay show={showRightButton}>
        <ArrowButton
          direction="right"
          onClick={handleNext}
          disabled={scrollPosition <= -(selectedRecipients.length * cardWidth - 1160)}
        />
      </RightArrowButtonDisplay>
    </>
  );
}

export default PopularCardList;
