import { useEffect, useRef, useState } from 'react';
import { Input } from './components/ui/input';
import { cn, generateId } from './lib/utils';

export default function App() {
  const [input, setInput] = useState<{ char: string; id: string }[]>([]);

  return (
    <div className="dark h-screen bg-gradient-to-br from-slate-900 to-violet-950">
      <div className="mx-auto max-w-screen-md pt-12">
        <h1 className="text-center text-4xl text-primary">Text Logo Maker</h1>

        <div className="mt-8 flex h-48 w-full items-center justify-center overflow-clip rounded border-4 border-dashed border-slate-400 bg-slate-100">
          <div className="flex text-slate-900">
            {input?.map(({ char, id }) => <Char char={char} key={id} />)}
          </div>
        </div>
        <p
          className={cn('italic opacity-0', input?.length > 0 && 'opacity-100')}
        >
          You can move the character around.
        </p>
        <Input
          className="dark mx-auto mt-4 w-96 bg-slate-900 text-foreground"
          onChange={(e) =>
            setInput(
              e.target.value
                .split('')
                .map((char) => ({ char, id: generateId() })),
            )
          }
          placeholder="Input your text here..."
        />
      </div>
    </div>
  );
}

function Char({ char }: { char: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      const el = ref.current;
      // get initial coordinate
      const init = el.getBoundingClientRect();
      // offset between cursor & coordinate (top, left)
      let offsetX = 0;
      let offsetY = 0;

      const dragMouse = (e: MouseEvent) => {
        e.preventDefault();
        // calculate offset on initial event
        if (offsetX === 0) {
          const pos = el.getBoundingClientRect();
          offsetX = e.pageX - pos.x;
          offsetY = e.pageY - pos.y;
        } else {
          el.style.transform = `translate(
            ${e.pageX - init.x - offsetX}px, ${e.pageY - init.y - offsetY}px
          )`;
        }
      };

      el.addEventListener('mousedown', (e) => {
        e.preventDefault();
        el.addEventListener('mousemove', dragMouse);
        // put the selected char in front of the others
        el.style.zIndex = '100';
      });
      // using window to make sure remove event becuase sometime mouseup triggered outside element on fast movement
      window.addEventListener('mouseup', () => {
        el.removeEventListener('mousemove', dragMouse);
        // reset offset
        offsetX = 0;
        offsetY = 0;
        el.style.zIndex = '0';
      });
    }
  });

  return (
    <span
      className="h-fit touch-none select-none text-7xl hover:cursor-grab active:cursor-grabbing"
      ref={ref}
    >
      {char}
    </span>
  );
}
