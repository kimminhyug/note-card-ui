'use client';
import { useContext, useState } from 'react';
import { NoteCardContext } from './note-card-context';
import { Row } from './row';

export const NoteCard = () => {
  // card provider
  const [activeTab, setActiveTab] = useState(0);
  // context type 구현 필요, 계산로직필요
  const [noteStyle, setNoteStyle] = useState({fontSize:'3em', lineHeight:'3em',backgroundSize:'100% 2em;'})
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
      name: ' 프로바이더 테스트',
      theme: cardColor.blue,
      // title: <span>페이지 2</span>,
      contents: (
        <>
          <Row>페이지 4 </Row>
          <Row>나만 폰트가 3배야</Row>
          <Row>NoteCardContext Provider</Row>
          <Row>계산 로직 구현해</Row>
        </>
      ),
    },
  ];

  return (
       
      <div className={`note-card-container ${tabs[activeTab].theme}`}>
        <NoteCardContext.Provider value={noteStyle}>
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
        </NoteCardContext.Provider>
      </div>


  );
};
