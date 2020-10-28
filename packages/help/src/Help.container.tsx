import {
  withClassDefault,
  withClassModifier,
  compose,
  identity,
} from '@axa-fr/react-toolkit-core';
import Help, { Props } from './Help';

export const enhance = compose(
  identity<Props>(),
  withClassDefault('af-popover__container'),
  withClassModifier()
);

const Enhanced = enhance(Help);
Enhanced.displayName = 'Help';

export default Enhanced;
