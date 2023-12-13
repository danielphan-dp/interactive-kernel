import React from 'react';
import './CellActionButton.css';

interface CellActionButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: JSX.Element;
}

const CellActionButton: React.FC<CellActionButtonProps> = ({ onClick, children }) => {
  return (
    <button className="button is-primary is-small" onClick={onClick}>
      <span className="icon">{children}</span>
    </button>
  );
};

export default CellActionButton;
