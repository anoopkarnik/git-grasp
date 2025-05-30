import { TaskParam } from "./node"

export interface ParamProps {
    param: TaskParam
    value: string
    updateNodeParamValue: (newValue:string) => void
    disabled?: boolean
}