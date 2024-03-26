import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import styles from '../../styles/Pages.module.css'

export const CONTEXT_MENU_ID = 'grammerExaminer';
export default function Index({ navigateToPage }) {
  const [selectedData, setSelectedData] = useState('')
  const [suggestions, setSuggestions] = useState('')
  const [loading, setLoading] = useState(false)
  const getData = async (text) => {
    try {
      setLoading(true)
      const res = await fetch('https://www.terpampas.com/api/grammer', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        mode: 'cors',
        body: JSON.stringify({
          key: '',
          text: `${text}`
        })
      })
      const data = await res.json();
      if (data?.candidates[0]?.content?.parts[0]?.text) {
        setSuggestions(data?.candidates[0]?.content?.parts[0]?.text)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const updatePopup = async () => {
    if (chrome && chrome.storage && chrome.storage.sync) {
      const data = await chrome.storage.sync.get([`${CONTEXT_MENU_ID}-selected`, `${CONTEXT_MENU_ID}-tab`])
      const text = data[`${CONTEXT_MENU_ID}-selected`]
      const tabId = data[`${CONTEXT_MENU_ID}-tab`]
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (tabId === tab.id) {
        if (text) {
          setSelectedData(text)
          getData(text)
        }
      }
    }
  }
  const reGenerate = () => {
    if (!selectedData)
      return
    getData(selectedData)
  }
  useEffect(() => {
    updatePopup();
  }, []);

  return (
    <div className={styles.container}>

      {
        loading ? <div className={styles.terminalLoader}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalTitle}>Status</div>
            <div className={styles.terminalControls}>
              <div className={[styles.control, styles.close]}></div>
              <div className={[styles.control, styles.minimize]}></div>
              <div className={[styles.control, styles.maximize]}></div>
            </div>
          </div>
          <div className={styles.text}>Loading...</div>
        </div> : <main className={styles.main}>
          <h2 className={styles.title}>Raw text</h2>
          <textarea
            className={styles.rawText}
            rows={5}
            value={selectedData}
            onChange={e => setSelectedData(e.target.value)}
          />
          <h2 className={styles.title}>Optimization suggestions</h2>
          {/* <p dangerouslySetInnerHTML={{ __html: suggestions }} className={styles.code}></p> */}
          {suggestions ? <Markdown className={styles.code}>{suggestions}</Markdown> : null}
          {/* <p onClick={reGenerate} className={styles.btn}>Regenerate</p> */}
          <button className={styles.pushable} onClick={reGenerate} >
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              Re-generate
            </span>
          </button>
        </main>
      }

    </div>
  );
}
