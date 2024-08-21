"use client"
import styles from "./SpinButton.module.css"

const SpinButton = () => {
    return (
        <button type="submit" className={styles.button}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={`${styles.front} ${styles.text}`}>Roll</span>
        </button>
    )
}

export default SpinButton
