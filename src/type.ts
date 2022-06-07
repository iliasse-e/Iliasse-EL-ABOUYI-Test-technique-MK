export interface Creative {
    id: string,
    createdBy: {
        firstName: string,
        lastName: string
    },
    contributors:
        {
            id: string,
            firstName: string,
            lastName: string
        }[],
    lastModified: Date,
    enabled: boolean,
    title: string,
    description: string,
    content: string,
    formats:
        {
            width: number,
            height: number
        }[]
}
