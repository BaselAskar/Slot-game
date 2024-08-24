"use client"
import styles from "./SpinButton.module.css"

interface Props {
    disabled?: boolean
}

const SpinButton = ({ disabled }: Props) => {
    return (
        <button type="submit" className={styles.button} disabled={disabled}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={`${styles.front} ${styles.text}`}>Roll</span>
        </button>
    )
}

export default SpinButton
