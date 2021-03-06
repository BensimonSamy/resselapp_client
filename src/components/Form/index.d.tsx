export interface Sneaker {
    _id: string,
    brand: string,
    model: string,
    type: string,
    label: string,
    size: number,
    shop: string,
    retail_price: number,
    ressel_price: number,
    sale_date: string,
    purchase_date: string,
    already_buy: boolean
}

export interface Size {
    _id: string
    us: string,
    eu: string,
    uk: string
}

export interface Props {
    onClose: () => void,
    defaultValues?: Sneaker
}