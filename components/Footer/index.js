/*
 * @LastEditors: Necfol
 * @Date: 2024-03-25 16:38:23
 * @LastEditTime: 2024-03-26 12:19:40
 * @FilePath: /grammer-examiner/components/Footer/index.js
 */
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://terpampas.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Grammer Examiner V.0.0.1
        <span className={styles.logo}>
          <img
            src="icons/ge.png"
            alt="Logo"
            width={16}
            height={16}
          />
        </span>
      </a>
    </footer>
  );
}
