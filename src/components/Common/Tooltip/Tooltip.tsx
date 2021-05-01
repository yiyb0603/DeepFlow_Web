import { CSSProperties, ReactElement, useMemo } from 'react';
import { Tooltip as ReactTooltip, withStyles } from '@material-ui/core';
import { palette } from 'styles/Palette/Palette';

const LightTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: palette.main,
    color: palette.white,
    fontSize: 12,
    marginTop: 4,
  },
}))(ReactTooltip);

interface TooltipProps {
  title: string;
  placement: 'top' | 'left' | 'right' | 'bottom';
  children: ReactElement;
}

const Tooltip = ({
  title,
  placement,
  children,
}: TooltipProps): JSX.Element => {
  const tooltipStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: palette.main,
      color: palette.white,
    };
  }, []);

  return (
    <LightTooltip
      title={title}
      placement={placement}
      style={tooltipStyle}
    >
      {children}
    </LightTooltip>
  );
};

export default Tooltip;