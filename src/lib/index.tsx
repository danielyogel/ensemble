import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import classnames from 'classnames';
import { BASE_MARGIN_X, BASE_MARGIN_Y, Layout } from './CONSTANTS';
import { RenderItemContainer } from './RenderItemContainer';

type Params<V extends { id: string }> = {
  layout: Layout;
  indexItem: V | null;
  items: Array<V>;
  renderIndex: (params: { item: V; layout: Layout }) => ReactNode;
  renderItem: (params: { item: V; layout: Layout; index: number }) => ReactNode;
  overflowVisible: boolean;
  noPadding?: boolean;
};

export function Ensemble<V extends { id: string }>({ layout, indexItem, items, renderItem, renderIndex, overflowVisible, noPadding }: Params<V>) {
  const isSingle = layout === 'SINGLE';

  const indexcomponent = indexItem ? (
    <motion.div
      key={indexItem.id}
      layout
      transition={{ ease: 'easeOut', duration: 0.7 }}
      initial={false}
      className={classnames('shrink-0 grow-0', { absolute: layout === 'SUN' || isSingle })}
      style={{ top: 0, left: '-100px' }}
    >
      {renderIndex({ item: indexItem, layout })}
    </motion.div>
  ) : null;

  return (
    <div className={classnames('h-full w-full relative')}>
      <div
        className={classnames('flex h-full items-center content-start justify-center py-10', {
          'flex-wrap': layout === 'MATRIX',
          'overflow-y-scroll': !overflowVisible && layout === 'MATRIX',
          'overflow-x-scroll': !overflowVisible && layout === 'LIST',
          'overflow-visible': overflowVisible,
          'px-4 sm:px-10 lg:px-18': !noPadding
        })}
      >
        {indexcomponent}
        {items.map((item, index) => {
          return <RenderItemContainer key={item.id} index={index} itemsLength={items.length} layout={layout} renderItem={renderItem} item={item} />;
        })}
      </div>
    </div>
  );
}
