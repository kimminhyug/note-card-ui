import { MouseEventHandler, ReactNode, useContext } from 'react';
import { NoteCardToolbarContext } from './note-card-context';
import { faAdd, faCopy, faEdit, faRemove, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RowData } from './row';

interface IToolbarProps {
  onAddRow?: () => void;
  onCopyRow?: (props: RowData) => void;
  onDeleteRow?: (props: RowData) => void;
}
export const Toolbar = ({ onAddRow, onCopyRow, onDeleteRow }: IToolbarProps): React.ReactElement => {
  const toolbarContext = useContext(NoteCardToolbarContext);

  return (
    <>
      <div
        className="toolbar-container flex-container gap-3 "
        style={{
          visibility: toolbarContext.selectedRow ? 'visible' : 'hidden',
          top: toolbarContext.position.y - 3,
          left: toolbarContext.position.x,
        }}
      >
        <ToolbarItem id={'row-add'} onclick={onAddRow} icon={faAdd}></ToolbarItem>
        <ToolbarItem id={'row-copy'} onclick={onCopyRow} icon={faCopy}></ToolbarItem>
        <ToolbarItem id={'row-delete'} onclick={onDeleteRow} icon={faRemove}></ToolbarItem>
      </div>
    </>
  );
};

interface IToolbarItemProps {
  id: string;
  icon: IconDefinition;
  onclick?: (row: RowData) => void;
  label?: string;
  className?: string;
  children?: ReactNode;
}

const ToolbarItem: React.FC<IToolbarItemProps> = ({ id = '', onclick = (e) => null, label, icon, className = '' }) => {
  const toolbarContext = useContext(NoteCardToolbarContext);
  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('click toolbar');
    onclick(toolbarContext.selectedRow);
  };
  return (
    <div className={`toolbar-item ${className}`} onClick={handleClickItem} title={label || id}>
      {/* {children} */}
      <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
    </div>
  );
};
