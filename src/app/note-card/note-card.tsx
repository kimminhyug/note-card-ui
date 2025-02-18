'use client';
import { useState } from 'react';

export const NoteCard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const cardColor = {
    purple: 'theme-purple',
    orange: 'theme-orange',
    'light-red': 'theme-light-red',
    blue: 'theme-blue',
    none: '',
  };
  const tabs = [
    {
      id: 'page1',
      name: '페이지 1',
      theme: cardColor.purple,
      title: <span>i am title</span>,
      contents: (
        <>
          <span>페이지 1 </span>
          <span>콘테츠 1</span>
          <span>콘테츠 2</span>
        </>
      ),
    },
    {
      id: 'page2',
      name: '페이지 2',
      theme: cardColor.orange,
      title: <span>페이지 2</span>,
      contents: (
        <>
          <span>페이지 2 </span>
          <span>콘테츠 1</span>
          <span>콘테츠 2</span>
        </>
      ),
    },
    {
      id: 'page3',
      name: '페이지 3',
      theme: cardColor['light-red'],
      title: <span>페이지 3</span>,
      contents: (
        <>
          <span>페이지 3 </span>
          <span>콘테츠 1</span>
          <span>콘테츠 2</span>
        </>
      ),
    },
    {
      id: 'page4',
      name: '제목없음',
      theme: cardColor.blue,
      // title: <span>페이지 2</span>,
      contents: (
        <>
          <span>페이지 4 </span>
          <span>콘테츠 1</span>
          <span>콘테츠 2</span>
        </>
      ),
    },
  ];

  return (
    <div className={`note-card-container ${tabs[activeTab].theme}`}>
      <div className="tab-container">
        {tabs.map((tab, idx) => (
          <div
            key={idx}
            className={`tab ${tab.theme} ${activeTab === idx ? 'active' : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.name}
          </div>
        ))}
        {/* <div className="tab bg-purple">페이지</div>
        <div className="tab bg-orange">페이지2</div>
        <div className="tab bg-light-red">페이지2</div>
        <div className="tab bg-blue">페이지2</div> */}
      </div>
      <div className="title">{tabs[activeTab].title && tabs[activeTab].title}</div>
      <div className="card-content flex-container flex-col">{tabs[activeTab].contents}</div>
    </div>
  );
};
