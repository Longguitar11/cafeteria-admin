import { CategoryType } from "@/types/category"
import { OrderInterface } from "@/types/order"

export interface Props {
    className?: string
    categories: CategoryType[]
    allCategories: CategoryType[]
    //
    setCategories: (category: CategoryType[]) => void
}