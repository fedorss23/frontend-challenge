import styles from "./Header.module.scss"
import { type PageType } from "../../types/page.type"

interface KotikHeaderProps {
  titles: PageType[];
  onPressTitle: (title: PageType) => void;
  currentTitle: PageType;
}

export default function KotikHeader({
  titles,
  onPressTitle,
  currentTitle,
}: KotikHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        {titles.map((title) => (
          <button
            onClick={() => onPressTitle(title)}
            className={
             `${styles.headerButton} ${currentTitle === title ? styles.active : ""}`
            }
            key={title}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
}
