import { UserType } from "@/types/user"

export interface Props {
    className?: string
    staff: UserType[]
    allStaff: UserType[]
    //
    setStaff: (staff: UserType[]) => void
}