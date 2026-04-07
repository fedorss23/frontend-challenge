import { useMemo, useState, useRef, useEffect, type RefObject } from "react";
import KotikHeader from "./components/headers/Header";
import { type PageType } from "./types/page.type";
import MainPage from "./components/pages/MainPage";
import { pages } from "./constants/page.constants";
import { useCats } from "./hooks/useCat";
import type { CatResponse } from "./types/cat.types";
import { storageService } from "./services/storage.service";
import { Loader } from "./components/ui/Loader";

interface GetCatsProps {
  page: string;
  cats: CatResponse[];
  savedCats: CatResponse[];
  ref: RefObject<HTMLDivElement | null>;
  isLoading?: boolean
}

function GetCats({ page, cats, savedCats, ref, isLoading }: GetCatsProps) {
  return (
    <>
      {page === "Все котики" && (isLoading ? <Loader /> : <MainPage cats={cats} ref={ref} />)}

      {page === "Любимые котики" && <MainPage cats={savedCats} />}
    </>
  );
}

function App() {
  const [page, setPage] = useState<PageType>("Все котики");
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useCats();
  const savedCats = storageService.getAllSavedCats();

  const cats = useMemo(() => {
    return data?.pages.flat() ?? [];
  }, [data]);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "100px", threshold: 0.1 },
    );

    const el = loadMoreRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <>
      <KotikHeader onPressTitle={setPage} titles={pages} currentTitle={page} />

      {!isLoading && (
        <GetCats
          page={page}
          cats={cats ? cats : []}
          savedCats={savedCats}
          ref={loadMoreRef}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default App;
