import { CSSProperties, useContext } from 'react';
import { NoteCardContext } from './note-card-context';

type IRow = (props: IRowProps) => React.ReactElement;
// style로 통일할까, 나눠서 관리할까, style은 너무 자유로운가
//  font size는 props drilling 처리 너무 많은데 context가 맞나

interface IRowProps {
  id: number;
  fontSize?: CSSProperties['fontSize'];
  children?: React.ReactElement | string;
  className?: string;
  onClick: (id) => void;
}
export const Row: IRow = ({ children, onClick, className, id }) => {
  const noteStyle = useContext(NoteCardContext);
  // const [isActive, setIsActive] = useState<boolean>(false);

  const handleClickRow = (ev: React.MouseEvent<HTMLSpanElement>) => {
    // setIsActive((prev)=>!prev)
    ev.currentTarget.focus();
  };
  return (
    <>
      <span tabIndex={id} onClick={handleClickRow} style={noteStyle} className={`row ${className}`}>
        {children}
      </span>
    </>
  );
};
