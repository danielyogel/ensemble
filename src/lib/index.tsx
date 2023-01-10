import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import classnames from 'classnames';

type Layout = 'SUN' | 'LIST' | 'MATRIX';

type Params<V extends { id: string }> = {
  layout: Layout;
  indexItem: V | null;
  items: Array<V>;
  renderIndex: (params: { item: V; layout: Layout }) => ReactNode;
  renderItem: (params: { item: V; layout: Layout; index: number }) => ReactNode;
};

const RADIUS = 350;

const BASE_MARGIN_Y = 500;
const BASE_MARGIN_X = 350;

export function Ensemble<V extends { id: string }>({ layout, indexItem, items, renderItem, renderIndex }: Params<V>) {
  return (
    <div className='h-full relative overflow-scroll flex grow-0 shrink-0'>
      {indexItem && (
        <motion.div
          key={indexItem.id}
          layout
          transition={{ ease: 'easeInOut', duration: 0.7 }}
          className={classnames('m-2', {
            absolute: layout === 'SUN',
            'w-52 h-80': true,
            fixed: layout === 'LIST'
          })}
          style={{ ...(layout === 'SUN' && { top: `${BASE_MARGIN_X - 150}px`, left: `${BASE_MARGIN_Y - 80}px` }) }}
        >
          {renderIndex({ item: indexItem, layout })}
        </motion.div>
      )}

      <div
        className={classnames('flex transition-transform duration-800 grow', {
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
              className={classnames('shrink-0 grow-0 p-1', {
                absolute: layout === 'SUN',
                'm-7': layout === 'MATRIX',
                'm-0': layout === 'LIST',
                'm-2': layout === 'SUN'
              })}
              animate={{ ...(layout === 'LIST' ? { width: '144px', height: '144px' } : { width: '37px', height: '37px' }) }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{
                top: `${BASE_MARGIN_X + x}px`,
                left: `${BASE_MARGIN_Y + y}px`
              }}
            >
              {renderItem({ item: currItem, layout, index })}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
