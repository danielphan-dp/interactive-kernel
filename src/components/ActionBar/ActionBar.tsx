import React from 'react';
import './ActionBar.css';
import { useActions } from '../../hooks/use-actions';
import CellActionButton from './CellActionButton/CellActionButton';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <CellActionButton onClick={() => moveCell(id, 'up')}>
        <i className="fas fa-arrow-up" />
      </CellActionButton>
      <CellActionButton onClick={() => moveCell(id, 'down')}>
        <i className="fas fa-arrow-down" />
      </CellActionButton>
      <CellActionButton onClick={() => deleteCell(id)}>
        <i className="fas fa-times" />
      </CellActionButton>
    </div>
  );
};

export default ActionBar;
