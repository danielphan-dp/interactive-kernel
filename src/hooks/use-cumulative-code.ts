import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    if (!state.cells) {
      return [];
    }
    const { data, order } = state.cells;
    const orderedCells = order.map((id: any) => data[id]);

    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      var show = (value) => {
        const root = document.querySelector('#root');
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      };
    `;

    const showFuncNoop = 'var show = () => {}';
    const cumulativeCode = [];
    for (let cell of orderedCells) {
      if (cell.type === 'code') {
        if (cell.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(cell.content);
      }
      if (cell.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join('\n');
};
