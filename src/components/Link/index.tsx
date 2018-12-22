import { Link as BaseLink } from "../../i18n";
import { styled, Text, TextProps } from "primithemes";

interface Props extends TextProps {
  to: string;
}

export const Link = styled(Text).attrs({
  as: BaseLink,
})<Props>``;
