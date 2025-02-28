import { useContext } from 'react';
import { NoteCardToolbarContext } from './note-card-context';

export const Toolbar = (): React.ReactElement => {
  const toolbarContext = useContext(NoteCardToolbarContext);
  return (
    <>
      <div
        style={{
          position: 'absolute',
          border: '1px solid rgb(56, 71, 241)',
          top: toolbarContext.position.y,
          left: toolbarContext.position.x,
          zIndex: 3,
          background: 'white',
        }}
      >
        test
      </div>
    </>
  );
};
