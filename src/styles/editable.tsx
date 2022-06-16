import styled from "styled-components";

const SpanEditable = styled.span`
  :empty:before {
    content: attr(placeholder);
    opacity: 0.6;
  }
  :focus {
    outline: 1px solid transparent;
  }
  display: inline-block;
  //   caret-color: transparent;
`;

export default SpanEditable;
