import axiosDefault from "../api/interceptor";
import { type CatResponse } from "../types/cat.types";

class CatService {
  async getImages(pageParam: number = 0): Promise<CatResponse[]> {
    const response = await axiosDefault.get<CatResponse[]>(`images/search`, {
      params: {
        limit: 10,
        page: pageParam,
      },
    });
    return response.data;
  }
}

export const catService = new CatService();
