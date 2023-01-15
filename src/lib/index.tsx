import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import classnames from 'classnames';
import type { OptionsType } from './CONSTANTS';

type Params<V extends { id: string }> = {
  layout: OptionsType;
  indexItem: V | null;
  items: Array<V>;
  renderIndex: (params: { item: V; layout: OptionsType }) => ReactNode;
  renderItem: (params: { item: V; layout: OptionsType; index: number }) => ReactNode;
};

const RADIUS = 350;

const BASE_MARGIN_Y = 500;
const BASE_MARGIN_X = 350;

export function Ensemble<V extends { id: string }>({ layout, indexItem, items, renderItem, renderIndex }: Params<V>) {
  return (
    <div className='h-full relative overflow-scroll'>
      {indexItem && (
        <motion.div
          key={indexItem.id}
          layout
          transition={{ ease: 'easeInOut', duration: 0.7 }}
          initial={false}
          className={classnames({ absolute: layout === 'SUN', fixed: layout === 'LIST' })}
          style={{ ...(layout === 'SUN' && { top: `${BASE_MARGIN_X - 150}px`, left: `${BASE_MARGIN_Y - 80}px` }) }}
        >
          {renderIndex({ item: indexItem, layout })}
        </motion.div>
      )}

      <div
        className={classnames('flex transition-transform duration-800', {
          'flex-wrap': layout === 'MATRIX',
          'translate-y-96': layout === 'LIST',
          'overflow-x-scroll': layout !== layout
        })}
      >
        {items.map((currItem, index) => {
          const angle = index * (360 / items.length);
          const x = RADIUS * Math.sin((Math.PI * 2 * angle) / 360);
          const y = RADIUS * Math.cos((Math.PI * 2 * angle) / 360);

          return (
            <motion.div
              key={currItem.id}
              layout
              className={classnames('shrink-0 grow-0', {
                absolute: layout === 'SUN',
                'm-7': layout === 'MATRIX',
                'm-3': layout === 'LIST',
                'm-2': layout === 'SUN'
              })}
              initial={false}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ top: `${BASE_MARGIN_X + x}px`, left: `${BASE_MARGIN_Y + y}px` }}
            >
              {renderItem({ item: currItem, layout, index })}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
