import { useState } from 'react';
import Char from './components/Char';
import ColorPicker from './components/ColorPicker';
import { Input } from './components/ui/input';
import { Slider } from './components/ui/slider';
import { Color, COLORS } from './constant';
import { cn, generateId } from './lib/utils';

export default function App() {
  const [input, setInput] = useState<{ char: string; id: string }[]>([]);
  const [colorActive, setColorActive] = useState<Color>('black');
  const [size, setSize] = useState<number[]>([1]);

  return (
    <div className="dark h-screen bg-gradient-to-br from-slate-900 to-violet-950">
      <div className="mx-auto max-w-screen-md pt-12">
        <h1 className="text-center text-4xl font-bold text-primary">
          Text Logo Maker
        </h1>

        <div className="mx-4 mt-8 flex h-48 items-center justify-center overflow-clip rounded border-4 border-dashed border-slate-400 bg-slate-100">
          <div className="flex text-slate-900">
            {input?.map(({ char, id }) => (
              <Char
                char={char}
                colorActive={colorActive}
                key={id}
                size={size[0]}
              />
            ))}
          </div>
        </div>
        <p
          className={cn(
            'mx-4 mt-1 text-sm italic opacity-0',
            input?.length > 0 && 'opacity-100',
          )}
        >
          You can move the character around.
        </p>
        <Input
          className="dark mx-auto mt-4 h-12 w-96 bg-slate-900 text-foreground"
          onChange={(e) =>
            setInput(
              e.target.value
                .split('')
                .map((char) => ({ char, id: generateId() })),
            )
          }
          placeholder="Input your text here..."
        />

        <div className="mx-auto mt-6 flex w-fit gap-2 pb-8">
          {COLORS.map((color) => (
            <ColorPicker
              color={color}
              colorActive={colorActive}
              key={color}
              setColorActive={setColorActive}
            />
          ))}
        </div>

        <div className="mt relative mx-auto mt-6 w-96 px-1">
          <Slider
            max={2}
            onValueChange={(v) => setSize(v)}
            step={0.1}
            value={size}
          />
        </div>
      </div>
    </div>
  );
}

// bg-gray-500 bg-red-500 bg-yellow-500 bg-green-500 bg-blue-500 bg-indigo-500 bg-purple-500 bg-pink-500
// border-gray-800 border-red-800 border-yellow-800 border-green-800 border-blue-800 border-indigo-800 border-purple-800 border-pink-800
// text-gray-500 text-red-500 text-yellow-500 text-green-500 text-blue-500 text-indigo-500 text-purple-500 text-pink-500
