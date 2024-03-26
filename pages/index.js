/*
 * @LastEditors: Necfol
 * @Date: 2024-03-25 16:38:23
 * @LastEditTime: 2024-03-26 12:27:02
 * @FilePath: /grammer-examiner/pages/index.js
 */
import React, { useState } from 'react';
import Index from '../components/Index';
import Config from '../components/Config';

export default function Home() {
  const [activePage, setActivePage] = useState('index');

  const navigateToPage = (page) => {
    setActivePage(page);
  };

  return (
    <>
      {activePage === 'index' && <Index navigateToPage={navigateToPage} />}
      {activePage === 'config' && <Config navigateToPage={navigateToPage} />}
    </>
  );
}
