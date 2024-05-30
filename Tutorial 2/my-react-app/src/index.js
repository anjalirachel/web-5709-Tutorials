import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import CSS file

function App() {
  return (
    <div className="app">
      <h1>Hello, React!</h1>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
