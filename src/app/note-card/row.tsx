import { CSSProperties, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { NoteCardContext } from './note-card-context';
/** RowData
 *  tab: 탭 ID - 해당 탭에서만 출력
 *   order: Row Order에 사용 예정
 *   content: 일단 컨텐츠
 */

export type RowData = {
  tab: number;
  order: number;
  // content: string | React.ReactElement;
  content: string;
};
type IRow = (props: IRowProps) => React.ReactElement;
// style로 통일할까, 나눠서 관리할까, style은 너무 자유로운가
//  font size는 props drilling 처리 너무 많은데 context가 맞나

export const ROW_MODE = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
} as const;

type RowModeType = (typeof ROW_MODE)[keyof typeof ROW_MODE];
interface IRowProps {
  row: RowData;
  id: number;
  // mode: RowModeType;
  fontSize?: CSSProperties['fontSize'];
  // children?: ReactElement|string;
  // text: string;
  className?: string;
  onClick: (id) => void;
  updateRow: (tab: any, order: any, newContent: any) => void;
}
export const Row: IRow = ({ onClick, className, id, row, updateRow }) => {
  const noteStyle = useContext(NoteCardContext);
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<RowModeType>(ROW_MODE.VIEW);
  const rowClass = useMemo(() => `row full-size ${className}`, [className]);
  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current?.select();
    }
  }, [mode]);

  const handleClickRow = (ev: React.MouseEvent<HTMLDivElement>) => {
    console.log('enable row focus');
    setMode(ROW_MODE.EDIT);
  };
  const handleDisableFocus = () => {
    console.log('disable row focus');
    setMode(ROW_MODE.VIEW);
  };
  const handleRowKeydown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      handleDisableFocus();
    }
  };

  return (
    <div className="row full-width" tabIndex={id} onClick={handleClickRow}>
      {mode === ROW_MODE.VIEW ? (
        <span
          id={id.toString()}
          tabIndex={id}
          // onClick={handleClickRow}
          style={noteStyle.styles}
          className={rowClass}
        >
          {row.content}
        </span>
      ) : (
        <input
          ref={textFieldRef}
          id={id.toString()}
          onKeyDown={handleRowKeydown}
          tabIndex={id}
          // onClick={handleClickRow}
          onBlur={handleDisableFocus}
          onChange={(e) => updateRow(row.tab, row.order, e.currentTarget.value)}
          style={noteStyle.styles}
          className={rowClass}
          value={row.content}
        ></input>
      )}
    </div>
  );
};
