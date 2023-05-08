import { FC } from "react";

export type IExtension<Props> = {
    name: string,
    description?: string,
    icon?: string,
    render: FC<Props>
}

