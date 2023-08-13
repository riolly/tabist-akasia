import { Color } from '../constant';
import { cn } from '../lib/utils';

export default function ColorPicker({
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
        color === 'black' && 'border-gray-500 bg-gray-800',
      )}
      onClick={() => setColorActive(color)}
    >
      <span className="absolute left-1/2 top-9 -translate-x-1/2">{color}</span>
    </button>
  );
}
