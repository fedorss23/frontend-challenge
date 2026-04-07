import type { RefObject } from "react";
import type { CatResponse } from "../../types/cat.types";
import { CatCard } from "./cards/CatCard";
import styles from "./Page.module.scss";

interface MainPageProps {
  cats: CatResponse[];
  ref?: RefObject<HTMLDivElement | null>;
}

export default function MainPage({ cats, ref }: MainPageProps) {
  return (
    <div className={styles.catContainers}>
      {cats.map((cat, i) => (
        <CatCard
          ref={i === cats.length - 1 ? ref : undefined}
          key={`${cat.id}-${i}`}
          cat={cat}
        />
      ))}
    </div>
  );
}
