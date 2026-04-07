import axiosDefault from "../api/interceptor";
import { type CatResponse } from "../types/cat.types";

class CatService {
  async getImages(pageParam: number = 0): Promise<CatResponse[]> {
    console.log("[SERVICE] [Axios request] go to the kotik");
    const response = await axiosDefault.get<CatResponse[]>(`images/search`, {
      params: {
        limit: 10,
        page: pageParam,
      },
    });

    console.log("[SERVICE] [Axios request] get the kotik");
    console.log("[SERVICE] [Axios request] get cats length: ", response.data.length)
    return response.data;
  }
}

export const catService = new CatService();
