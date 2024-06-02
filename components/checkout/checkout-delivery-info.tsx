interface CheckoutDeliveryInfoProps {
    deliveryInfo: {
        name: string;
        email: string;
        phone: string;
        province: string;
        address: string;
        date?: string;
        note?: string;
    };
}

export default function CheckoutDeliveryInfo({ deliveryInfo }: CheckoutDeliveryInfoProps) {
    return (
        <div className="space-y-4 text-sm">
            <div className="flex space-x-2">
                <p className="text-medium w-5/12">Full Name</p>
                <p className="text-right text-slate-500 w-7/12">
                    {deliveryInfo.name}
                </p>
            </div>
            <div className="flex">
                <p className="text-medium w-5/12">Personal Email</p>
                <p className="text-right text-slate-500 w-7/12">
                    {deliveryInfo.email}
                </p>
            </div>
            <div className="flex">
                <p className="text-medium w-5/12">Phone Number</p>
                <p className="text-right text-slate-500 w-7/12">
                    {deliveryInfo.phone}
                </p>
            </div>

            <div className="flex">
                <p className="text-medium w-5/12">Province</p>
                <p className="text-right text-slate-500 w-7/12">
                    {deliveryInfo.province}
                </p>
            </div>
            <div className="flex">
                <p className="text-medium w-5/12">Full Address</p>
                <p className="text-right text-slate-500 w-7/12">
                    {deliveryInfo.address}
                </p>
            </div>
            {deliveryInfo.date && (
                <div className="flex">
                    <p className="text-medium w-5/12">Delivery Date</p>
                    <p className="text-right text-slate-500 w-7/12">
                        {deliveryInfo.date}
                    </p>
                </div>
            )}
            {deliveryInfo.note && (
                <div className="flex">
                    <p className="text-medium w-5/12">Delivery Note</p>
                    <p className="text-right text-slate-500 w-7/12">
                        {deliveryInfo.note}
                    </p>
                </div>
            )}
        </div>
    );
}
