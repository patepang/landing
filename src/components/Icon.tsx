import type { Icon as PhosphorIcon } from '@phosphor-icons/react/dist/lib/types';

import { iconSize, type IconSize, type IconWeight } from '@/design/tokens';

export interface IconProps {
  /** A Phosphor icon component, imported from its own `@phosphor-icons/react/dist/ssr/<Name>`. */
  glyph: PhosphorIcon;
  size?: IconSize;
  weight?: IconWeight;
  className?: string;
}

/**
 * Icons come only from Phosphor. They are decorative here: the words next to them carry the
 * meaning, so every icon is hidden from assistive technology.
 */
export function Icon({ glyph: Glyph, size = 'md', weight = 'regular', className }: IconProps) {
  return (
    <Glyph
      size={iconSize[size]}
      weight={weight}
      className={className}
      aria-hidden="true"
      focusable="false"
    />
  );
}
