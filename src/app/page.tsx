import React from "react";
import { NoteCard } from "./note-card/note-card";

export default function Home() {
  return (
    <div
      style={{
        // height: "80%",
        width: "80%",
        height: "50%",
        alignContent: "center",
        justifyItems: "center",
      }}
    >
      <NoteCard />
    </div>
  );
}
