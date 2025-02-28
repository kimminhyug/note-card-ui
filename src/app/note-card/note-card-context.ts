import { createContext } from 'react';
import { INoteCardProps } from './note-card';

export const NoteCardContext = createContext<{ styles: INoteCardProps['noteStyles'] }>({ styles: { fontSize: '1em' } });
export const NoteCardToolbarContext = createContext<{
  setPosition?: ({ x, y }) => void;
  position: { x: number; y: number };
}>({
  position: { x: 0, y: 0 },
});
