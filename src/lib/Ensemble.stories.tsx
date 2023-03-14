import '../index.css';
import '../ladle.css';

import { useState } from 'react';
import { SingleSelect } from './components';
import { Ensemble } from '.';
import { OPTIONS } from './CONSTANTS';
import classNames from 'classnames';

type LayoutType = typeof OPTIONS[number];

export function EnsembleStory() {
  const [state, setState] = useState<LayoutType>('LIST');

  const items = [...Array(60)].map((_, i) => ({ id: String(i), text: String(i) }));
  const _OPTIONS = OPTIONS.map((key) => ({ key }));

  return (
    <section className='h-full w-full'>
      <Ensemble
        layout={state}
        items={items}
        indexItem={null}
        renderItem={({ item: { id, text }, layout }) => {
          return <RenderCard text={text} layout={layout} />;
        }}
        renderIndex={({ item: { id, text }, layout }) => {
          return <RenderCard text={text} layout={layout} />;
        }}
        overflowVisible={false}
      />

      <section className='fixed bottom-4 right-5'>
        <SingleSelect label='visible' onSelect={setState} value={state} options={_OPTIONS} />
      </section>
    </section>
  );
}

//
// internals...
//

function RenderCard({ text, layout }: { text?: string; layout: LayoutType }) {
  return (
    <div className={classNames('border h-20 bg-primary mr-3 mb-0.5', { 'w-32': layout !== 'ROWS', 'w-full': layout === 'GALLERY' })}>{text}</div>
  );
}
