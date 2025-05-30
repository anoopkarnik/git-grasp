export enum PackId {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE"
}

export type CreditsPack = {
    id: PackId,
    name: string,
    label: string,
    credits: number,
    price: number,
    productId?: string
}


export const CreditsPack:CreditsPack[] = [
    {
        id: PackId.SMALL,
        name: 'Small Pack',
        label: '200 credits',
        credits: 200,
        price: 199,
        productId: process.env.SMALL_PACK_PRODUCT_ID
    },
    {
        id: PackId.MEDIUM,
        name: 'Medium Pack',
        label: '500 credits',
        credits: 500,
        price: 499,
        productId: process.env.MEDIUM_PACK_PRODUCT_ID
    },
    {
        id: PackId.LARGE,
        name: 'Large Pack',
        label: '1000 credits',
        credits: 1000,
        price: 999,
        productId: process.env.LARGE_PACK_PRODUCT_ID
    }
]

export const getCreditsPack = (id: PackId) => CreditsPack.find(p => p.id === id)