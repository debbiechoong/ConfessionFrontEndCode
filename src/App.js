import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ConfessionList from './routes/ConfessionList';
import AdminL from './routes/AdminList';
import Home from './routes/Home'
import AdminP from './routes/AdminP';
import Search from './routes/Search';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/adminList' element={<AdminL />} />
        <Route path='/adminPendingList' element={<AdminP />} />
        <Route path='/confession' element={<ConfessionList />} />
        <Route path='/search' element={<Search />} />

      </Routes>
    </>
  );
}

export default App;