import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import classnames from 'classnames';
import type { OptionsType } from './CONSTANTS';
import { RenderItemContainer } from './RenderItemContainer';

type Params<V extends { id: string }> = {
  layout: OptionsType;
  indexItem: V | null;
  items: Array<V>;
  renderIndex: (params: { item: V; layout: OptionsType }) => ReactNode;
  renderItem: (params: { item: V; layout: OptionsType; index: number }) => ReactNode;
  forceOverflowVisible: boolean;
};

export const RADIUS = 350;

export const BASE_MARGIN_Y = 500;
export const BASE_MARGIN_X = 350;

export function Ensemble<V extends { id: string }>({ layout, indexItem, items, renderItem, renderIndex, forceOverflowVisible }: Params<V>) {
  return (
    <div className='h-full w-full relative'>
      {indexItem && (
        <motion.div
          key={indexItem.id}
          layout
          transition={{ ease: 'easeOut', duration: 0.7 }}
          initial={false}
          className={classnames({ absolute: layout === 'SUN', fixed: layout === 'LIST' })}
          style={{ ...(layout === 'SUN' && { top: `${BASE_MARGIN_X - 150}px`, left: `${BASE_MARGIN_Y - 80}px` }) }}
        >
          {renderIndex({ item: indexItem, layout })}
        </motion.div>
      )}

      <div
        className={classnames('flex h-full items-center content-start py-10', {
          'flex-wrap': layout === 'MATRIX',
          'overflow-y-scroll': !forceOverflowVisible && layout === 'MATRIX',
          'overflow-x-scroll': !forceOverflowVisible && layout === 'LIST',
          'overflow-visible': forceOverflowVisible
        })}
      >
        {items.map((item, index) => {
          return <RenderItemContainer key={item.id} index={index} itemsLength={items.length} layout={layout} renderItem={renderItem} item={item} />;
        })}
      </div>
    </div>
  );
}
