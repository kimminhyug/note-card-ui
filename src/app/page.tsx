import React from 'react';
import { NoteCard } from './note-card/note-card';

export default function Home() {
  return (
    <div
      style={{
        // height: "80%",
        width: '80%',
        height: '50%',
        alignContent: 'center',
        justifyItems: 'center',
      }}
    >
      {/* row count로 height 지정 또는 역으로 */}
      <NoteCard rowCount={0} noteStyles={{ fontSize: '1.5em' }} />
    </div>
  );
}
