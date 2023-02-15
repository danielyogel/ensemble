import '../index.css';

import { useState } from 'react';
import { SingleSelect } from './components';
import { Ensemble } from '.';
import { OPTIONS } from './CONSTANTS';

export function EnsembleStory() {
  const [state, setState] = useState<typeof OPTIONS[number]>('LIST');

  const items = [...Array(60)].map((_, i) => ({ id: String(i), text: String(i) }));
  const _OPTIONS = OPTIONS.map((key) => ({ key }));

  return (
    <section className='p-2 flex w-11/12 mx-auto h-full'>
      <section className='mt-12 mx-6 w-10/12 grow-0 overflow-hidden' style={{ height: '47rem' }}>
        <Ensemble
          layout={state}
          items={items}
          indexItem={{ id: 'index', text: 'index' }}
          renderItem={({ item: { id, text } }) => {
            return <RenderCard text={text} />;
          }}
          renderIndex={({ item: { id, text }, layout }) => {
            return <RenderCard text={text} />;
          }}
          overflowVisible={false}
        />
      </section>
      <section className='shrink-0 grow-0 w-2/12 mt-12'>
        <SingleSelect label='visible' onSelect={setState} value={state} options={_OPTIONS} />
      </section>
    </section>
  );
}

function RenderCard({ text }: { text?: string }) {
  return <div className='border w-32 h-20 bg-primary mr-3 mb-3'>{text}</div>;
}
