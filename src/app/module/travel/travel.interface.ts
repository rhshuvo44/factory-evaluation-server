export type TTravel = {
    slNo: number;
    date: Date;
    particulars: string;
    description: string;
    remark?: string;
    buyerId?: string;
    orderNo?: string;
    payTo: string;
    paymentType: 'Monthly' | 'Day' | 'Once';
    unit?: string;
    unitPrice: number;
    totalPrice: number;
}