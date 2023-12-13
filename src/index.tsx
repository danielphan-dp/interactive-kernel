import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/CellList/CellList';

const App = () => {
  return (
    <Provider {...{ store }}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root')!);
root.render(<App />);
