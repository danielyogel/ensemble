import { ReactNode, useMemo } from 'react';
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
    <div className='h-full w-full relative'>
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
        className={classnames('flex transition-transform duration-1000', {
          'flex-wrap': layout === 'MATRIX',
          'translate-y-96': layout === 'LIST',
          'overflow-x-scroll': layout === 'LIST'
        })}
      >
        {items.map((currItem, index) => {
          const angle = useMemo(() => index * (360 / items.length), [index, items.length]);
          const x = useMemo(() => RADIUS * Math.sin((Math.PI * 2 * angle) / 360), [angle]);
          const y = useMemo(() => RADIUS * Math.cos((Math.PI * 2 * angle) / 360), [angle]);

          return (
            <motion.div
              layout
              initial={false}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className={classnames('shrink-0 grow-0 m-7', { absolute: layout === 'SUN' })}
              style={{ top: `${BASE_MARGIN_X + x}px`, left: `${BASE_MARGIN_Y + y}px` }}
              key={currItem.id}
            >
              {renderItem({ item: currItem, layout, index })}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
