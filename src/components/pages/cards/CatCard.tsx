import type { CatResponse } from "../../../types/cat.types";
import { storageService } from "../../../services/storage.service";
import styles from "./CatCard.module.scss";
import { useEffect, useState, type RefObject } from "react";

interface CatCardProps {
  cat: CatResponse;
  ref?: RefObject<HTMLDivElement | null>
}

export function CatCard({ cat, ref }: CatCardProps) {
    const [isSaved, setIsSaved] = useState<boolean>()

    useEffect(() => {
        const checkCat = () => setIsSaved(storageService.isHasCat(cat.id))
        checkCat()
    }, [cat])


  const onPressButton = () => {
    if (storageService.isHasCat(cat.id)) {
        storageService.removeCat(cat.id);
        setIsSaved(false)
    } else {
        const resp = storageService.addCat(cat);
        if (resp) setIsSaved(true)
    }
  };

  return (
    <div className={styles.card} ref={ref}> 
      <img src={cat.url} alt="" className={styles.image} />
      <button onClick={onPressButton} className={`${styles.favoriteButton}`}>
        <HeartIcon filled={isSaved}/>
      </button>
    </div>
  );
}

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "#ff4444" : "none"}
      stroke={"#ff4444"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${styles.svg}`}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
