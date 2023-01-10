import '../index.css';

import classNames from 'classnames';
import { useState } from 'react';
import { SingleSelect } from './components';
import { Ensemble } from '.';
import { OPTIONS } from './CONSTANTS';

export function EnsembleStory() {
  const [state, setState] = useState<typeof OPTIONS[number]>('MATRIX');

  const items = [...Array(60)].map((_, i) => ({ id: String(i), text: String(i) }));
  const _OPTIONS = OPTIONS.map((key) => ({ key }));

  return (
    <section className='p-2 flex w-11/12 mx-auto'>
      <section className='mt-12 mx-6 w-10/12 grow-0 overflow-hidden' style={{ height: '47rem' }}>
        <Ensemble
          layout={state}
          items={items}
          indexItem={{ id: 'index123', text: 'IDX' }}
          renderItem={({ item: { id, text } }) => {
            return <div className='bg-primary w-full h-full'>content</div>;
          }}
          renderIndex={({ item: { id, text }, layout }) => {
            return <div className={classNames('bg-primary w-full h-full')}>content</div>;
          }}
        />
      </section>
      <section className='shrink-0 grow-0 w-2/12 mt-12'>
        <SingleSelect label='visible' onSelect={setState} value={state} options={_OPTIONS} />
      </section>
    </section>
  );
}
