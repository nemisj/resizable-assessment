import React from 'react';
import styled, { css } from 'styled-components';
import { getProperty, Direction } from './common';

interface Props {
  direction: Direction;
}

export type OnMouseDown = (e: React.SyntheticEvent, index: number) => void;
interface GutterProps {
  onMouseDown: OnMouseDown;
  index: number;
  direction: Direction;
  BarComponent?: React.ComponentType<any>;
}

const spaceSize = '10px';

// it has 0 size
const GutterContainer = styled.div`
  position: relative;
  overflow: visible;
  width: 100%;
  height: 100%;
  ${({ direction }: Props) => getProperty(direction)}: 0;
`;

const GutterSpaceVertical = css`
  cursor: col-resize;
  width: ${spaceSize};
  left: calc(${spaceSize} / 2 * -1);
  flex-direction: row;
`;

const GutterSpaceHorizontal = css`
  cursor: row-resize;
  height: ${spaceSize};
  top: calc(${spaceSize} / 2 * -1);
  flex-direction: column;
`;

const GutterSpace = styled.div`
  position: absolute;
  z-index: 1000;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;

  ${({ direction }: Props) =>
    direction === 'column' ? GutterSpaceHorizontal : GutterSpaceVertical};
`;

const GutterBarVertical = css`
  width: 1px;

  ${GutterSpace}:hover & {
    border-left: 2px dashed #a9418b;
  }
`;

const GutterBarHorizontal = css`
  content: 'tableton';
  height: 1px;

  ${GutterSpace}:hover & {
    border-top: 2px dashed #a9418b;
  }
`;

const GutterBar = styled.div`
  height: 100%;
  width: 100%;

  ${({ direction }: Props) =>
    direction === 'column' ? GutterBarHorizontal : GutterBarVertical};
`;

export const Gutter: React.FC<GutterProps> = ({
  index,
  onMouseDown,
  direction,
  BarComponent,
}) => {
  const mousedown = React.useCallback(
    (e) => {
      onMouseDown(e, index);
    },
    [onMouseDown, index]
  );

  const Bar = (BarComponent !== undefined
    ? BarComponent
    : GutterBar) as React.ComponentType<any>;

  return (
    <GutterContainer direction={direction} onMouseDown={mousedown}>
      <GutterSpace direction={direction}>
        <Bar direction={direction} />
      </GutterSpace>
    </GutterContainer>
  );
};
