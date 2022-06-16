import styled from "styled-components";
import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
} from "styled-system";

type BoxProps = LayoutProps & SpaceProps & ColorProps & FlexboxProps;
const Box = styled.div<BoxProps>`
  ${space}
  ${layout}
  ${color}
  ${flexbox}
  vertical-align: baseline;
`;

export default Box;

type SpanBoxProps = SpaceProps &
  LayoutProps & {
    background?: string;
    icon?: string;
  };
const SpanBox = styled.span<SpanBoxProps>`
  ${space}
  ${layout}
  background: ${(p) => p.background || "transparent"};
  &:before {
    content: "${(p) => p.icon}";
    vertical-align: bottom;
  }
`;

export { SpanBox };
