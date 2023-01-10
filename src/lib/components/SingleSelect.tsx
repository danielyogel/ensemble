import { Radio } from '@nextui-org/react';

type Params<K extends string> = {
  label: string;
  value: K;
  onSelect: (selection: K) => void;
  options: Array<{ key: K }>;
};

export function SingleSelect<K extends string>({ label, value, options, onSelect }: Params<K>) {
  return (
    <div>
      <div className='mb-2 capitalize text-xs font-bold'>{label}</div>
      <div>
        <Radio.Group color='secondary' value={value} onChange={(selection) => onSelect(selection as K)} size='xs'>
          {options.map((currItem) => {
            return (
              <Radio key={currItem.key} value={currItem.key} color='secondary'>
                <span className='capitalize text-xs'>{currItem.key.toLocaleLowerCase().split('_').join(' ')}</span>
              </Radio>
            );
          })}
        </Radio.Group>
      </div>
    </div>
  );
}
