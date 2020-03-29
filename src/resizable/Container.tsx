import React from 'react';
import styled from 'styled-components';

// @ts-ignore
import useResizeAware from 'react-resize-aware';

import { Direction, getProperty } from './common';
import { OnMouseDown, Gutter } from './Gutter';
import { useOnEnd, useMove } from './useMove';

interface ContainerProps {
  direction?: Direction;
  className?: string;
  id?: string;
  GutterComponent?: React.ComponentType<any>;
}

interface DataProp {
  ['data-min-size']: string | undefined;
}

interface State {
  length: number; // number of children,
  size: number | null; // last width | height
}

type SetState = (value: number[]) => void;

const runEffect = (
  oldState: State,
  size: number,
  children: React.ReactNode,
  sizes: number[],
  setSizes: SetState
) => {
  let recalculate = false;
  let reset = false;
  const length = React.Children.count(children);

  if (oldState.size !== size) {
    recalculate = true;
    reset = !oldState.size; //keep reseting till we get correct value
  }

  if (oldState.length !== length) {
    reset = true;
    recalculate = true;
  }

  if (!recalculate) {
    return;
  }

  let newSizes = null;
  if (reset) {
    // this is initial calculation
    const mainChunk = size / React.Children.count(children);
    newSizes = React.Children.map(children, () => mainChunk);
  } else {
    // find the correct aspect ration
    newSizes = recalculateSize(sizes, size);
  }

  // don't set, if nothing is changed
  // lame way to compare content of arrays
  if (newSizes && JSON.stringify(newSizes) !== JSON.stringify(sizes)) {
    setSizes(newSizes);
  }
};

const wrapChildren = (
  direction: Direction,
  children: React.ReactNode,
  sizes: number[],
  onMouseDown: OnMouseDown,
  GutterComponent?: React.ComponentType<any>
) => {
  const property = getProperty(direction);

  return React.Children.map(children, (child, index) => {
    const value = sizes[index] || 0;
    const data: DataProp = {
      'data-min-size': undefined,
    };

    if (React.isValidElement(child)) {
      const props = child.props;
      if (props && 'minSize' in props) {
        data['data-min-size'] = props.minSize;
      }
    }

    return (
      <React.Fragment key={index}>
        {index !== 0 ? (
          <Gutter
            direction={direction}
            index={index}
            onMouseDown={onMouseDown}
            BarComponent={GutterComponent}
          />
        ) : null}
        <div style={{ [property]: value }} {...data}>
          {child}
        </div>
      </React.Fragment>
    );
  });
};

const recalculateSize = (arr: number[], size: number): number[] => {
  const oldSize = arr.reduce((value, sum) => value + sum, 0);
  return arr.map((value) => (1 / oldSize) * value * size);
};

const ContainerElement = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props: { direction: Direction }) => props.direction};
  width: 100%;
  height: 100%;
`;

export const Container: React.FC<ContainerProps> = ({
  direction = 'row',
  children,
  className,
  id,
  GutterComponent,
}) => {
  const [resizeListener, sizes] = useResizeAware();
  const [childrenSizes, setChildrenSizes] = React.useState<number[]>([]);
  const oldStateRef = React.useRef<State>({
    length: 0,
    size: null, // height for column and width for row
  });

  const size = sizes[getProperty(direction)];

  React.useEffect(() => {
    const state = oldStateRef.current;
    const length = React.Children.count(children);
    oldStateRef.current = { length, size };
    runEffect(state, size, children, childrenSizes, setChildrenSizes);
  }, [id, size, children, childrenSizes, setChildrenSizes]);

  const onEnd = useOnEnd(direction, childrenSizes, setChildrenSizes);
  const { onMouseDown } = useMove(direction, onEnd);
  const childrenWithWrappers = wrapChildren(
    direction,
    children,
    childrenSizes,
    onMouseDown,
    GutterComponent
  );

  return (
    <ContainerElement direction={direction} className={className}>
      {resizeListener}
      {childrenWithWrappers}
    </ContainerElement>
  );
};
