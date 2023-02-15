import { ReactNode, useMemo } from 'react';
import { motion } from 'framer-motion';
import classnames from 'classnames';
import { BASE_MARGIN_X, BASE_MARGIN_Y, Layout, RADIUS } from './CONSTANTS';

type ParamsItem<V extends { id: string }> = {
  item: V;
  index: number;
  layout: Layout;
  itemsLength: number;
  renderItem: (params: { item: V; layout: Layout; index: number }) => ReactNode;
};

export function RenderItemContainer<V extends { id: string }>({ index, item, renderItem, itemsLength, layout }: ParamsItem<V>) {
  const angle = useMemo(() => index * (360 / itemsLength), [index, itemsLength]);
  const x = useMemo(() => RADIUS * Math.sin((Math.PI * 2 * angle) / 360), [angle]);
  const y = useMemo(() => RADIUS * Math.cos((Math.PI * 2 * angle) / 360), [angle]);

  return (
    <motion.div
      layout
      initial={false}
      transition={{ duration: 0.8, delay: 0, ease: [0.25, 1, 0.5, 1] }}
      className={classnames('shrink-0 grow-0', { absolute: layout === 'SUN' })}
      style={{ top: `${BASE_MARGIN_X + x}px`, left: `${BASE_MARGIN_Y + y}px` }}
      key={item.id}
    >
      {renderItem({ item: item, layout, index })}
    </motion.div>
  );
}
