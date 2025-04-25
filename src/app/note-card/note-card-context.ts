import { createContext } from 'react';
import { INoteCardProps, INoteStyles } from './note-card';
import { RowData } from './row';

export const NoteCardContext = createContext<{ styles: INoteStyles }>({
  styles: {
    content: undefined,
    title: undefined,
    container: undefined,
  },
});
export const NoteCardToolbarContext = createContext<{
  setPosition?: ({ x, y }) => void;
  position: { x: number; y: number };
  selectedRow?: RowData;
  setSelectedRow?: (row: RowData) => void;
}>({
  position: { x: 0, y: 0 },
  selectedRow: null,
});
