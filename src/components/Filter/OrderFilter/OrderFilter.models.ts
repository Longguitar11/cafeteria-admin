import { OrderInterface } from "@/types/order"
import { UserType } from "@/types/user"

export interface Props {
    className?: string
    orders: OrderInterface[]
    allOrders: OrderInterface[]
    //
    setOrders: (orders: OrderInterface[]) => void
}