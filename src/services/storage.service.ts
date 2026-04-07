import type { CatResponse } from "../types/cat.types"

class StorageService {
    getAllSavedCats(): CatResponse[] {
        try {
            const data = localStorage.getItem("saved-cats")

            if (data) {
                const cats = JSON.parse(data)
                return cats
            }
            return []
        } catch (e) {
            console.error("Error with get all saved cats: ", e)
            return []
        }
    }

    addCat(cat: CatResponse): boolean {
        try {
            const data = this.getAllSavedCats()

            if (this.isHasCat(cat.id)) {
                console.warn("Cat already saved:", cat.id)
                return false
            }

            const cats = [...data, cat]
            localStorage.setItem("saved-cats", JSON.stringify(cats))
            return true
        } catch (e) {
            console.error("Error with add cat to saved cats: ", e)
            return false
        }
    }

    isHasCat(catId: string): boolean {
        try {
            const data = this.getAllSavedCats()

            if (!data) {
                return false
            }

            for (const cat of data) {
                if (cat.id === catId) return true 
            }

            return false
        } catch (e) {
            console.log(e)
            return false
        }
    }

    removeCat(catId: string): boolean {
        try {
            const data = this.getAllSavedCats()
            const newData = data.filter(cat => cat.id !== catId)
                
            if (data.length === newData.length) return false
            
            localStorage.setItem("saved-cats", JSON.stringify(newData))
            return true
        } catch (e) {
            console.error("Error with remove cat: ", e)
            return false
        }
    }
}

export const storageService = new StorageService()