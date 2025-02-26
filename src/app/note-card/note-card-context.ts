import { createContext } from 'react';
import { INoteCardProps } from './note-card';

export const NoteCardContext = createContext<{ styles: INoteCardProps['noteStyles'] }>({ styles: { fontSize: '1em' } });
