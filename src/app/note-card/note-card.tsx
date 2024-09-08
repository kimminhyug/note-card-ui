import React from "react";

export const NoteCard = () => {
  const cardColor = {
    purple: "bg-purple",
  };
  return (
    <div className={`note-card-container ${cardColor.purple}`}>
      <div className="tab-container">
        <div className="tab bg-purple">페이지</div>
        <div className="tab bg-orange">페이지2</div>
        <div className="tab bg-light-red">페이지2</div>
        <div className="tab bg-blue">페이지2</div>
      </div>

      <div className="card-content "></div>
    </div>
  );
};
