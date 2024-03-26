/*
 * @LastEditors: Necfol
 * @Date: 2024-03-25 16:38:23
 * @LastEditTime: 2024-03-26 12:52:27
 * @FilePath: /grammer-examiner/components/Config/index.js
 */
import { useEffect, useState } from 'react'
import { CONTEXT_MENU_ID } from '../Index/index'
import styles from '../../styles/Pages.module.css'

export default function New({ navigateToPage }) {
  const [key, setKey] = useState('')
  const saveToSync = () => {
    if (key) {
      chrome.storage.sync.set({ [`${CONTEXT_MENU_ID}-keyValue`]: key })
      chrome.storage.sync.set({ [`${CONTEXT_MENU_ID}-keyType`]: 'google' })
      navigateToPage('index')
    }
  }
  const getKeyFromStorage = async () => {
    const syncData = await chrome.storage.sync.get([`${CONTEXT_MENU_ID}-keyValue`, `${CONTEXT_MENU_ID}-keyType`])
    const storageKey = syncData[`${CONTEXT_MENU_ID}-keyValue`]
    setKey(storageKey)
  }
  useEffect(() => {
    getKeyFromStorage()
  }, [])
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Your Api Key</h2>
        <p>(for now just google)</p>
        <textarea
          className={styles.rawText}
          rows={3}
          value={key}
          onChange={e => setKey(e.target.value)}
        />
        <p onClick={saveToSync} style={{ cursor: 'pointer' }}>Save</p>
      </main>
    </div>
  )
}