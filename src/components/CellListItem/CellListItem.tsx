import './CellListItem.css';
import { Cell } from '../../state';
import CodeCell from '../CodeCell/CodeCell';
import TextEditor from '../TextEditor/TextEditor';
import ActionBar from '../ActionBar/ActionBar';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return (
    <div className="cell-list-item">
      {cell.type === 'code' ? (
        <>
          <div className="action-bar-wrapper">
            <ActionBar id={cell.id} />
          </div>
          <CodeCell cell={cell} />
        </>
      ) : (
        <>
          <div className="action-bar-wrapper">
            <ActionBar id={cell.id} />
          </div>
          <TextEditor cell={cell} />
        </>
      )}
    </div>
  );
};

export default CellListItem;
