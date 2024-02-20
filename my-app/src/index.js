import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Table from './Table/App';

const STATUS=
{
  Free:"Свободен",
  Booked:"Забронирован",
  Busy:"Занят",
  FreedUp:"Освобождается",
}

const tableComponents = Array.from(Array(1).keys()).map((index) => (
  <Table key={index} Status={STATUS.Free} Number={index + 1} />
));



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {tableComponents}
  </React.StrictMode>
);
