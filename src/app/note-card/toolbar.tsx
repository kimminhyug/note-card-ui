import { MouseEventHandler, ReactNode, useContext } from 'react';
import { NoteCardToolbarContext } from './note-card-context';
import { faCopy, faEdit, faRemove, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Toolbar = (): React.ReactElement => {
  const toolbarContext = useContext(NoteCardToolbarContext);
  return (
    <>
      <div
        className="toolbar-container flex-container gap-3 "
        style={{
          top: toolbarContext.position.y - 3,
          left: toolbarContext.position.x,
        }}
      >
        <ToolbarItem id={'A'} icon={faEdit}></ToolbarItem>
        <ToolbarItem id={'B'} icon={faCopy}></ToolbarItem>
        <ToolbarItem id={'C'} icon={faRemove}></ToolbarItem>
      </div>
    </>
  );
};

interface IToolbarItemProps {
  id: string;
  icon: IconDefinition;
  onclick?: (e: MouseEventHandler<HTMLDivElement>) => void;
  label?: string;
  className?: string;
  children?: ReactNode;
}

const ToolbarItem: React.FC<IToolbarItemProps> = ({ id = '', onclick = (e) => null, label, icon, className = '' }) => {
  const handleClickItem = (e) => {
    onclick(e);
  };
  return (
    <div className={`toolbar-item ${className}`} onClick={handleClickItem} title={label || id}>
      {/* {children} */}
      <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
    </div>
  );
};
