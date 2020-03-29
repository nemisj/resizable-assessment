import React from 'react';

import { Direction, getProperty } from './common';

interface Box {
  width: number;
  height: number;
}

interface OnEndProps {
  beforeBox: Box;
  afterBox: Box;
  index: number;
}

export type OnEnd = (props: OnEndProps) => void;

interface Item {
  box: Box;
  node: Element;
  minSize: number | null;
}

interface State {
  index: number;
  x: number;
  y: number;
  before: Item;
  after: Item;
}

const setNewSize = (
  before: Item,
  after: Item,
  property: 'width' | 'height',
  delta: number
) => {
  let newBeforeSize = before.box[property] - delta;
  let newAfterSize = after.box[property] + delta;

  // make check for minimum sizes
  if (
    (before.minSize && before.minSize > newBeforeSize) ||
    (after.minSize && after.minSize > newAfterSize)
  ) {
    return;
  }

  // @ts-ignore
  before.node.style[property] = `${newBeforeSize}px`;

  // @ts-ignore
  after.node.style[property] = `${newAfterSize}px`;
};

const getAfterBefore = (
  node: Element | null
): { after?: Element; before?: Element } => {
  if (node) {
    const after = node.nextElementSibling;
    const before = node.previousElementSibling;

    if (after && before) {
      return {
        after,
        before,
      };
    }
  }

  return {};
};

/**
 * Breaks out from React sandbox and works directly on DOM
 * When finished, will sync DOM sizes into react state
 */
export const useMove = (direction: Direction, onEnd: OnEnd) => {
  const startSateRef = React.useRef<State | null>(null);

  const onMouseMove = React.useCallback(
    (e) => {
      e.preventDefault();

      const state = startSateRef.current;
      if (!state) {
        return;
      }

      const { screenX, screenY } = e;
      const { before, after } = state;

      // recalculate sizes for both
      if (direction === 'row') {
        // width and X are important
        const delta = state.x - screenX;
        setNewSize(before, after, 'width', delta);
      } else {
        // height and Y are important
        const delta = state.y - screenY;
        setNewSize(before, after, 'height', delta);
      }
    },
    [direction]
  );

  const onMouseUp = React.useCallback(
    (e) => {
      const state = startSateRef.current;
      if (!state) {
        return;
      }

      startSateRef.current = null;

      const { index, after, before } = state;
      const beforeBox = before.node.getBoundingClientRect();
      const afterBox = after.node.getBoundingClientRect();

      onEnd({
        beforeBox,
        afterBox,
        index,
      });
    },
    [onEnd]
  );

  const onMouseDown = React.useCallback((e, index) => {
    const { before, after } = getAfterBefore(e.currentTarget);
    if (before && after) {
      const beforeBox = before.getBoundingClientRect();
      const afterBox = after.getBoundingClientRect();

      startSateRef.current = {
        x: e.screenX,
        y: e.screenY,
        before: {
          box: beforeBox,
          node: before,
          minSize: Number(before.getAttribute('data-min-size')) || 50,
        },
        after: {
          box: afterBox,
          node: after,
          minSize: Number(after.getAttribute('data-min-size')) || 50,
        },
        index,
      };
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);

    return () => {
      document.removeEventListener('mousemove', onMouseMove, false);
      document.removeEventListener('mouseup', onMouseUp, false);
    };
  }, [onMouseMove, onMouseUp]);

  return { onMouseDown };
};

export const useOnEnd = (
  direction: Direction,
  value: number[],
  setValue: (val: number[]) => void
): OnEnd => {
  const property = getProperty(direction);

  return React.useCallback(
    ({ beforeBox, afterBox, index }) => {
      value[index - 1] = beforeBox[property];
      value[index] = afterBox[property];
      setValue(value);
    },
    [property, value, setValue]
  );
};
