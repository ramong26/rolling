import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import styled from "styled-components";
import { useState, useEffect } from "react"; // useEffect 추가
import { textStyle } from "../../../../styles/textStyle";

const ToText = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  margin-bottom: 0.75rem;
  height: 2.625rem;
`;

const ToLabel = styled.label.withConfig({
  shouldForwardProp: (prop) => prop !== "error", // "error" prop은 DOM으로 전달되지 않음
})`
  display: block;
  border: 1px solid #cccccc;
  height: 3.125rem;
  border-radius: 0.5rem;
  position: relative;
  &:focus-within {
    border: 1px solid #00a2fe;
    box-shadow: 0 0 5px rgba(0, 162, 254, 0.5);
  }

  ${(props) =>
    props.$error &&
    `  
    border: 1px solid red;
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
  `}
`;

const ToInput = styled.input`
  ${(props) => textStyle(16, 400)(props)}
  border: none;
  color: #555555;
  width: calc(100% - 2rem);
  height: 1.625rem;
  margin: 0.75rem 1rem;
  outline: none;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 0.25rem;
  position: absolute;
`;

function InputName({ value, onChange, onError }) {
  const [hasError, setHasError] = useState(false);

  // 값이 변경될 때마다 에러 초기화
  useEffect(() => {
    if (value && (value.length >= 2 && value.length <= 8)) {
      setHasError(false);
      onError(false); // 에러 상태를 부모로 전달
    }
  }, [value, onError]);

  const handleBlur = () => {
    if (!value || value.length < 2 || value.length > 8) {
      setHasError(true); // 이름 길이가 2글자 미만이거나 8글자 초과이면 에러 상태로 변경
      onError(true); // 에러 상태를 부모로 전달
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  return (
    <>
      <ToText>To.</ToText>
      <ToLabel $error={hasError}>
        <ToInput
          value={value} // 부모에서 받은 value
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="이름을 입력해 주세요"
        />
      </ToLabel>
      {hasError && (
        <ErrorMessage>이름은 2글자 이상, 8글자 이하로 입력해주세요.</ErrorMessage>
      )}
    </>
  );
}

export default InputName;
