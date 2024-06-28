import React from 'react';
import Sidebar from './components/Sidebar'
import Header from './components/Header';
import Filter from './components/Filter';
import Kanban from './components/Kanban';
import './global.css'

export default function App() {
  return (
    <div id="app">
      < Sidebar />
      <main>
        <div className="inner">
          < Header />
          < Filter />
          < Kanban />
        </div>
      </main>
    </div>
  )
}

