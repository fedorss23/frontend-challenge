import { useInfiniteQuery } from "@tanstack/react-query";
import { catService } from "../services/cat.service";

export function useCats() {
  return useInfiniteQuery({
    queryKey: ["get cats"],
    queryFn: ({pageParam = 0}) => catService.getImages(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined;

      return allPages.length;
    },
    staleTime: 1000 * 60 * 5
  });
}
