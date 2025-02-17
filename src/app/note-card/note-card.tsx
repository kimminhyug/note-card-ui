import React from "react";

export const NoteCard = () => {
  const cardColor = {
    purple: "bg-purple",
    none: "",
  };
  return (
    <div className={`note-card-container ${cardColor.none}`}>
      <div className="tab-container">
        <div className="tab bg-purple">페이지</div>
        <div className="tab bg-orange">페이지2</div>
        <div className="tab bg-light-red">페이지2</div>
        <div className="tab bg-blue">페이지2</div>
      </div>

      <div className="card-content flex-container flex-col">
        {new Array(12).fill("텍스트 테스트").map((_, idx) => (
          <span key={idx}>텍스트 테스트 {idx}</span>
        ))}
      </div>
    </div>
  );
};
