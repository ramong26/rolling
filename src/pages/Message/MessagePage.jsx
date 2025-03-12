import ProfileInput from "../../components/common/Input/ProfileInput/ProfileInput";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";

function MessagePage() {
  const { id } = useParams();
  return (
    <Bone>
      <ProfileInput />
      <p>Post ID: {id}</p> {/* 동적 ID 출력 */}
    </Bone>
  );
}

export default MessagePage;

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bone = styled.div`
  ${flexCenter}
`;
