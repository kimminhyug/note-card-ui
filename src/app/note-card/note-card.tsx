'use client';
import React, { CSSProperties, useEffect, useReducer, useState } from 'react';
import { NoteCardContext, NoteCardToolbarContext } from './note-card-context';
import { Row, RowData } from './row';
import { Toolbar } from './toolbar';

const isEmpty = (v) => {
  return (v === '' || v === null || v === undefined || v?.length === 0) && v !== 0;
};

const cardColor = {
  purple: 'theme-purple',
  orange: 'theme-orange',
  'light-red': 'theme-light-red',
  blue: 'theme-blue',
  black: 'theme-black',
  none: '',
};

// 폰트 사이즈
export interface INoteCardProps {
  rowCount?: number;
  // rowHeight: number| string;

  noteStyles?: { fontSize?: number | string; lineHeight?: number | string; titleHeight?: number | string };
}

const ROW_ACTION = {
  UPDATE: 'UPDATE',
  ADD: 'ADD',
  COPY: 'COPY',
  DELETE: 'DELETE',
} as const;

const defaultRowList: RowData[] = [
  { tab: 0, order: 1, content: '콘테츠 1' },
  { tab: 0, order: 2, content: '콘테츠 2' },
  { tab: 0, order: 3, content: '' },

  { tab: 1, order: 1, content: '탭1 - 콘테츠 1' },
  { tab: 1, order: 2, content: '탭1 - 콘테츠 2' },

  { tab: 2, order: 1, content: '콘테츠 1' },
  { tab: 2, order: 2, content: '콘테츠 2' },

  { tab: 3, order: 1, content: '나만 폰트가 3배야' },
  { tab: 3, order: 2, content: 'NoteCardContext Provider' },
  { tab: 3, order: 3, content: '계산 로직 구현해' },
];
const DEFAULT_ROW: RowData = {
  tab: null,
  order: null,
  content: '데이터를 입력하세요.',
};
const getDefaultRow = (props: RowData): RowData => {
  return { ...DEFAULT_ROW, ...props };
};
type RowActions = keyof typeof ROW_ACTION;
const rowReducer = (state, action: { type: RowActions; payload: { row?: RowData; tabIdx: number } }) => {
  const { type, payload } = action;
  const { tabIdx, row: payloadRow } = payload;
  console.log(state);
  switch (type) {
    case ROW_ACTION.UPDATE:
      return state.map((row) =>
        row.tab === payloadRow.tab && row.order === payloadRow.order ? { ...row, content: payloadRow.content } : row
      );

    case ROW_ACTION.ADD:
      return [
        ...state,
        {
          ...getDefaultRow(payloadRow),
          tab: tabIdx,
          order: state.filter((row) => row.tab === payload.tabIdx).at(-1).order + 1,
        },
      ];
    case ROW_ACTION.DELETE:
      console.log(state.filter((row) => row.tab === payloadRow.tab).filter((row) => row.order !== payloadRow.order));
      return state.filter((row) => row.tab === payloadRow.tab).filter((row) => row.order !== payloadRow.order);
    case ROW_ACTION.COPY:
      return [
        ...state,
        {
          ...getDefaultRow(payloadRow),
          tab: tabIdx,
          order: state.filter((row) => row.tab === payload.tabIdx).at(-1).order + 1,
          content: payloadRow.content,
        },
      ];

    default:
      return state;
  }
};

interface INoteContentStyle {
  // fontSize: number | string;
  // lineHeight: number | string;
  // backgroundSize: number | string;
}
interface INoteTitleStyle {
  // height: number | string;
}
interface INoteContainerStyle {
  // height: number | string;
}
export interface INoteStyles {
  content: INoteContentStyle & CSSProperties;
  title: INoteTitleStyle & CSSProperties;
  container: INoteContainerStyle & CSSProperties;
}
export const getFontSize = (size: string | number) => {
  if (!size) return 1;
  const result = size?.toString()?.match(/[\d.]+/);
  return result ? Number(result?.[0]) : null;
};
export const NoteCard = ({ rowCount = 6, noteStyles = {} }: INoteCardProps) => {
  // 탭 idx
  const [activeTab, setActiveTab] = useState(0);
  // modal재활용할까음
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newName, setNewName] = useState<string>('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedRow, setSelectedRow] = useState<RowData | null>();

  const [noteStyle, setNoteStyle] = useState<INoteStyles>({
    content: {
      fontSize: noteStyles.fontSize || '1rem',
      lineHeight: `${getFontSize(noteStyles.fontSize)}em` || '2rem',
      backgroundSize: `100% ${`${getFontSize(noteStyles.fontSize) * 2}rem`}`,
    },
    title: { height: noteStyles.titleHeight || `2rem` },
    container: {
      minHeight: `calc(${`${getFontSize(noteStyles.fontSize)}em` || '2rem'} * ${rowCount} + ${noteStyles.titleHeight || '2rem'})`,
    },
  });

  const [rowList, dispatch] = useReducer(rowReducer, defaultRowList);

  const updateRow = (tab, order, content) => {
    dispatch({ type: ROW_ACTION.UPDATE, payload: { tabIdx: activeTab, row: { tab, order, content } } });
  };

  const addRow = () => {
    dispatch({
      type: ROW_ACTION.ADD,
      payload: { tabIdx: activeTab, row: null },
    });
  };
  const copyRow = (row: RowData) => {
    dispatch({
      type: ROW_ACTION.COPY,
      payload: { tabIdx: row.tab, row: row },
    });
  };
  const deleteRow = (row: RowData) => {
    dispatch({ type: ROW_ACTION.DELETE, payload: { tabIdx: row.tab, row: row } });
  };

  const handleNoteKeydown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    const rows = document.querySelectorAll('.card-content .row');
    const currentIdx = Array.from(rows).findIndex((e) => e === document.activeElement);

    if (ev.key === 'ArrowDown') {
      // 위에 1개가 더 존재하니깐 내려 갈수 있음 +1
      if (currentIdx < rows.length - 1) {
        (rows[currentIdx + 1] as HTMLSpanElement).focus();
      }
    } else if (ev.key === 'ArrowUp') {
      // 0번쨰보다 크니 아직 올라갈 수 있음 방향키업
      if (currentIdx > 0) {
        (rows[currentIdx - 1] as HTMLSpanElement).focus();
      }
    }
  };

  // contents는 따로 가는게 관리하기 편할듯
  const [tabs, setTabs] = useState([
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
    // {
    //   id: 'page3',
    //   name: '페이지 3',
    //   theme: cardColor['light-red'],
    //   title: () => <span>페이지 3</span>,
    // },
    // {
    //   id: 'page4',
    //   name: ' 프로바이더 테스트',
    //   theme: cardColor.blue,
    //   // title: ()=><Row>페이지 2</Row>,
    // },
    {
      id: 'add',
      name: ' +',
      theme: cardColor.black,
      // title: ()=><Row>페이지 2</Row>,
    },
  ]);
  // 컴포넌트 props
  // 컴포넌트 컨셉이 데이터가 많을꺼 같진 않으니 1개의 배열에 모두 관리
  // {
  //   0:[{ tab: 0, id: 1, content: '페이지 1',  }],
  //   1:[{ tab: 1, id: 1, content: '페이지 2',  }]
  // }

  const getCurrentRowList = (rowList, tabId: number) => {
    return rowList.filter((defaultRow) => defaultRow.tab === tabId);
  };

  const handleSelectTab = (id, idx) => {
    if (id === 'add') {
      setOpenAddModal(true);
    } else {
      setOpenAddModal(false);
      setActiveTab(idx);
    }
  };

  const handleRowClick = (row: RowData): void => {
    console.log(row, ' clicked');
  };

  const handleChangeNewTabName = (ev) => {
    setNewName(ev.target.value);
  };
  const handleSubmitNewTab = () => {
    if (isEmpty(newName)) return;
    setTabs((prev) => [
      ...prev,
      { id: newName, name: newName, theme: cardColor.black, title: () => <span>{newName}</span> },
    ]);
  };

  return (
    <NoteCardContext.Provider value={{ styles: noteStyle }}>
      <NoteCardToolbarContext.Provider
        value={{
          position: position,
          setPosition: setPosition,
          selectedRow: selectedRow,
          setSelectedRow: setSelectedRow,
        }}
      >
        <Toolbar onAddRow={addRow} onCopyRow={copyRow} onDeleteRow={deleteRow} />
        {openAddModal && (
          <div className="add-tab-modal">
            <div>add</div>
            <div>
              <input type="text" onChange={handleChangeNewTabName}></input>
              <button onClick={handleSubmitNewTab}>추가</button>
            </div>
          </div>
        )}
        <div
          className={`note-card-container ${tabs[activeTab].theme}`}
          onKeyDown={handleNoteKeydown}
          style={noteStyle.container}
        >
          <div className="tab-container">
            {tabs.map((tab, idx) => (
              <div
                key={idx}
                className={`tab ${tab.theme} ${activeTab === idx ? 'active' : ''}`}
                onClick={() => handleSelectTab(tab.id, idx)}
              >
                {tab.name}
              </div>
            ))}
          </div>
          <div className="title" style={noteStyle.title}>
            {tabs[activeTab].title && tabs[activeTab].title()}
          </div>
          <div className="card-content flex-container flex-col" style={noteStyle.content}>
            {rowList
              .filter((row) => row.tab === activeTab)
              .map((row, idx) => {
                return (
                  <Row
                    //
                    // 탭 + order는 추가, 삭제아닌 경우 바뀔일이 없음. 불필요하게 마운트 일어나지 않도록 키 설정
                    key={`${row.tab}-${row.order}`}
                    id={idx}
                    onClick={() => handleRowClick(row)}
                    // text={row.content}
                    // row
                    row={row}
                    updateRow={updateRow}
                    // className={row.active ? 'active' : ''}
                  >
                    {/* {row.content} */}
                  </Row>
                );
              })}
          </div>
        </div>
      </NoteCardToolbarContext.Provider>
    </NoteCardContext.Provider>
  );
};
