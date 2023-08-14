import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import Char from './components/Char';
import ColorPicker from './components/ColorPicker';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Slider } from './components/ui/slider';
import { Color, COLORS } from './constant';
import { cn, generateId } from './lib/utils';

export default function App() {
  const [input, setInput] = useState<{ char: string; id: string }[]>([]);
  const [colorActive, setColorActive] = useState<Color>('black');
  const [size, setSize] = useState<number[]>([12]);

  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 to-violet-950">
      <div className="mx-auto max-w-screen-sm pt-12">
        <h1 className="text-center text-5xl font-bold text-background">
          Text Logo Maker
        </h1>

        <div className="mx-4 mt-12 rounded border-4 border-dashed border-slate-400 bg-slate-100">
          <div
            className="flex h-56 items-center justify-center overflow-clip "
            id="canvas"
          >
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
        </div>
        <p
          className={cn(
            'mx-4 mt-1 text-sm italic text-background opacity-0',
            input?.length > 0 && 'opacity-100',
          )}
        >
          You can move the character around.
        </p>
        <Input
          className="mx-auto mt-6 w-96 "
          onChange={(e) =>
            setInput(
              e.target.value
                .split('')
                .map((char) => ({ char, id: generateId() })),
            )
          }
          placeholder="Input your text here..."
          ref={ref}
        />

        <div className="dark relative mx-auto mt-6 w-96 px-1">
          <Slider
            max={48}
            onValueChange={(v) => setSize(v)}
            step={1}
            value={size}
          />
        </div>

        <div className="mx-auto mt-6 flex w-fit gap-2 pb-6">
          {COLORS.map((color) => (
            <ColorPicker
              color={color}
              colorActive={colorActive}
              key={color}
              setColorActive={setColorActive}
            />
          ))}
        </div>

        <div className="mx-auto mt-8 w-fit">
          <Button
            onClick={() => {
              const targetDiv = document.getElementById('canvas')!;
              // const canvas = document.createElement('canvas');

              // canvas.width = targetDiv.offsetWidth;
              // canvas.height = targetDiv.offsetHeight;
              // const ctx = canvas.getContext('2d')!;

              // // Draw the content of the targetDiv onto the canvas
              // ctx.clearRect(0, 0, canvas.width, canvas.height);
              // const data = new XMLSerializer().serializeToString(targetDiv);
              // const img = new Image();
              // img.src =
              //   'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data);

              // img.onload = () => {
              //   ctx.drawImage(
              //     img,
              //     0,
              //     0,
              //     targetDiv.offsetWidth,
              //     targetDiv.offsetHeight,
              //   );

              //   canvas.toBlob((blob) => {
              //     // Create a link element to download the image
              //     const downloadLink = document.createElement('a');
              //     downloadLink.href = URL.createObjectURL(blob!);
              //     downloadLink.download = 'logo.png';
              //     downloadLink.click();
              //   }, 'image/png');
              // };

              html2canvas(targetDiv).then((canvas) => {
                // Convert the canvas to an image data URL
                const imageDataUrl = canvas.toDataURL('image/png');

                // Create a link element to download the image
                const downloadLink = document.createElement('a');
                downloadLink.href = imageDataUrl;
                downloadLink.download = `${ref.current?.value}_logo.png`;
                downloadLink.click();
              });
            }}
            variant={'secondary'}
          >
            Download Logo
          </Button>
        </div>
      </div>
    </div>
  );
}

// bg-gray-500 bg-red-500 bg-yellow-500 bg-green-500 bg-blue-500 bg-indigo-500 bg-purple-500 bg-pink-500
// border-gray-800 border-red-800 border-yellow-800 border-green-800 border-blue-800 border-indigo-800 border-purple-800 border-pink-800
// text-gray-500 text-red-500 text-yellow-500 text-green-500 text-blue-500 text-indigo-500 text-purple-500 text-pink-500
