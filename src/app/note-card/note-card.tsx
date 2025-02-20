'use client';
import React, { useState } from 'react';
import { NoteCardContext } from './note-card-context';
import { Row } from './row';

/** RowData
 *  tab: 탭 ID - 해당 탭에서만 출력
 *   order: Row Order에 사용 예정
 *   content: 일단 컨텐츠
 */

type RowData = {
  tab: number;
  order: number;
  content: string | React.ReactElement;
};

export const NoteCard = ({ rowCount }) => {
  // 탭 idx
  const [activeTab, setActiveTab] = useState(0);
  const [noteStyle, setNoteStyle] = useState({ fontSize: '1em', lineHeight: '2em', backgroundSize: '100% 2em' });

  const cardColor = {
    purple: 'theme-purple',
    orange: 'theme-orange',
    'light-red': 'theme-light-red',
    blue: 'theme-blue',
    none: '',
  };
  // contents는 따로 가는게 관리하기 편할듯
  const tabs = [
    {
      id: 'page1',
      name: '페이지 1',
      theme: cardColor.purple,
      title: () => <span>i am title</span>,
    },
    {
      id: 'page2',
      name: '페이지 2',
      theme: cardColor.orange,
      title: () => <span>페이지 2</span>,
    },
    {
      id: 'page3',
      name: '페이지 3',
      theme: cardColor['light-red'],
      title: () => <span>페이지 3</span>,
    },
    {
      id: 'page4',
      name: ' 프로바이더 테스트',
      theme: cardColor.blue,
      // title: ()=><Row>페이지 2</Row>,
    },
  ];
  // 컴포넌트 props
  // 컴포넌트 컨셉이 데이터가 많을꺼 같진 않으니 1개의 배열에 모두 관리
  // {
  //   0:[{ tab: 0, id: 1, content: '페이지 1',  }],
  //   1:[{ tab: 1, id: 1, content: '페이지 2',  }]
  // }

  const defaultRowList: RowData[] = [
    { tab: 0, order: 1, content: '콘테츠 1' },
    { tab: 0, order: 2, content: '콘테츠 2' },
    { tab: 0, order: 2, content: '생각해보니 focus 쓰면 되네' },

    { tab: 1, order: 1, content: '탭1 - 콘테츠 1' },
    { tab: 1, order: 2, content: '탭1 - 콘테츠 2' },

    { tab: 2, order: 1, content: '콘테츠 1' },
    { tab: 2, order: 2, content: '콘테츠 2' },

    { tab: 3, order: 1, content: '나만 폰트가 3배야' },
    { tab: 3, order: 2, content: 'NoteCardContext Provider' },
    { tab: 3, order: 3, content: '계산 로직 구현해' },
  ];

  const getCurrentRowList = (rowList, tabId: number) => {
    return rowList.filter((defaultRow) => defaultRow.tab === tabId);
  };

  const [rowList, setRowList] = useState(defaultRowList);

  const handleSelectTab = (idx) => {
    setActiveTab(idx);
  };

  const handleRowClick = (id): void => {
    // active 음 이거 남겨야하나
    setRowList((prev) => prev.map((row) => (row.tab === activeTab ? { ...row, active: row.order === id } : row)));
  };

  return (
    <div className={`note-card-container ${tabs[activeTab].theme}`}>
      <NoteCardContext.Provider value={noteStyle}>
        <div className="tab-container">
          {tabs.map((tab, idx) => (
            <div
              key={idx}
              className={`tab ${tab.theme} ${activeTab === idx ? 'active' : ''}`}
              onClick={() => handleSelectTab(idx)}
            >
              {tab.name}
            </div>
          ))}
        </div>
        <div className="title">{tabs[activeTab].title && tabs[activeTab].title()}</div>
        <div className="card-content flex-container flex-col">
          {rowList
            .filter((row) => row.tab === activeTab)
            .map((row, idx) => (
              <Row
                // 탭 + order는 추가, 삭제아닌 경우 바뀔일이 없음. 불필요하게 마운트 일어나지 않도록 키 설정
                key={`${row.tab}-${row.order}`}
                id={row.order}
                onClick={() => handleRowClick(row.order)}
                // className={row.active ? 'active' : ''}
              >
                {row.content}
              </Row>
            ))}
        </div>
      </NoteCardContext.Provider>
    </div>
  );
};
