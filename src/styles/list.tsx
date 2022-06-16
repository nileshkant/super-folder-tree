import styled from "styled-components";
import { typography, TypographyProps } from "styled-system";
const List = styled.ul`
  list-style: none;
  padding-left: 20px;
  margin: 0;
`;

export default List;

type LiProps = TypographyProps & {
  cursor?: string;
  background?: string;
};
const ListItem = styled.li<LiProps>`
  list-style: none;
  ${typography}
  cursor: ${(p) => p.cursor || "default"};
  background-color: ${(p) => p.background || "transparent"};
`;

export { ListItem };
