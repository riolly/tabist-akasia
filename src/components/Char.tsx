import { useEffect, useRef } from 'react';
import { Color } from '../constant';

export default function Char({
  char,
  colorActive,
  size,
}: {
  char: string;
  colorActive: Color;
  size: number;
}) {
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
  }, []);

  return (
    <span
      className={`h-fit touch-none select-none text-7xl hover:cursor-grab active:cursor-grabbing text-${colorActive}-500 `}
      ref={ref}
      // style={{ scale: `${size * 100}%` }}
      style={{ fontSize: `${60 + size * 2}px` }}
    >
      {char}
    </span>
  );
}
