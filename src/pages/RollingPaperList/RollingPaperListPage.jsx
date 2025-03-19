import { useNavigate } from "react-router-dom";
import CreateAtCardList from "../../components/domain/rollingpaper/Card/CreateAtCardList";
import styled from "styled-components";
import PopularCardList from "../../components/domain/rollingpaper/Card/PopularCardList";
import Button from "../../components/common/Button/Button";

const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  padding: 0 20px;

  @media (max-width: 1199px) {
    padding: 0 10px;
  }

  @media (max-width: 767px) {
    padding: 0 5px;
  }
`;

const PageWrapper = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: calc(100vh - 65px);
  width: 100%;
  margin: auto;

  @media (max-width: 1199px) {
    padding: 30px;
  }

  @media (max-width: 767px) {
    padding: 20px;
  }
`;


const TitleWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 10;
  padding: 10px 0;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const TitleText = styled.div`
  text-align: left;
  width: 100%;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    font-size:20px;
    font-weight: 600;
    line-height:30px;
  }
`;


const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;

  @media (max-width: 1199px) {
    margin-top: 15px;
  }

  @media (max-width: 767px) {
    margin-top: 10px;
  }
`;


const StyledCardList = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 50px;
  width: 100%;
  flex-direction: row-reverse; 
  overflow: hidden; 
  
  @media (max-width: 1199px) {
    gap: 15px;
  }

  @media (max-width: 767px) {
    gap: 10px;
    flex-direction: column;
    align-items: center;
  }
`;

function RollingPaperListPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <PageWrapper>
        <TitleWrapper>
          <Title>
            <TitleText>인기 롤링 페이퍼🔥</TitleText>
          </Title>
        </TitleWrapper>

        <StyledCardList>
          <PopularCardList />
        </StyledCardList>

        <TitleWrapper>
          <Title>
            <TitleText>최근에 만든 롤링 페이퍼⭐</TitleText>
          </Title>
        </TitleWrapper>

        <StyledCardList>
          <CreateAtCardList />
        </StyledCardList>

        <ButtonWrapper>
          <Button
            variant="primary"
            size="56"
            width="280"
            onClick={() => navigate(`/post`)}
          >
            나도 만들어보기
          </Button>
        </ButtonWrapper>
      </PageWrapper>
    </Container>
  );
}

export default RollingPaperListPage;
