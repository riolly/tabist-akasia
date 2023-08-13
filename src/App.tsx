import { useState } from 'react';
import Char from './components/Char';
import { Input } from './components/ui/input';
import { Color, COLORS } from './constant';
import { cn, generateId } from './lib/utils';

export default function App() {
  const [input, setInput] = useState<{ char: string; id: string }[]>([]);

  const [colorActive, setColorActive] = useState<Color>('gray');

  return (
    <div className="dark h-screen bg-gradient-to-br from-slate-900 to-violet-950">
      <div className="mx-auto max-w-screen-md pt-12">
        <h1 className="text-center text-4xl text-primary">Text Logo Maker</h1>

        <div className="mt-8 flex h-48 w-full items-center justify-center overflow-clip rounded border-4 border-dashed border-slate-400 bg-slate-100">
          <div className="flex text-slate-900">
            {input?.map(({ char, id }) => (
              <Char char={char} colorActive={colorActive} key={id} />
            ))}
          </div>
        </div>
        <p
          className={cn(
            'mt-1 text-sm italic opacity-0',
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

        <div className="mx-auto mt-6 flex w-fit gap-2">
          {COLORS.map((color) => (
            <ColorPicker
              color={color}
              colorActive={colorActive}
              key={color}
              setColorActive={setColorActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorPicker({
  color,
  colorActive,
  setColorActive,
}: {
  color: Color;
  colorActive: Color;
  setColorActive: React.Dispatch<React.SetStateAction<Color>>;
}) {
  return (
    <button
      className={cn(
        `relative h-10 w-10 rounded-lg border-4 border-opacity-0 bg-${color}-500 border-${color}-800 text-white text-opacity-0 transition-all duration-300`,
        colorActive === color && 'border-opacity-100 text-opacity-100',
      )}
      onClick={() => setColorActive(color)}
    >
      <span className="absolute left-1/2 top-9 -translate-x-1/2">{color}</span>
    </button>
  );
}

// bg-gray-500 bg-red-500 bg-yellow-500 bg-green-500 bg-blue-500 bg-indigo-500 bg-purple-500 bg-pink-500
// border-gray-800 border-red-800 border-yellow-800 border-green-800 border-blue-800 border-indigo-800 border-purple-800 border-pink-800
// text-gray-500 text-red-500 text-yellow-500 text-green-500 text-blue-500 text-indigo-500 text-purple-500 text-pink-500
