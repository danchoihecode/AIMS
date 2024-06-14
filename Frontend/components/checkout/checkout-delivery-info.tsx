import { DeliveryInfoDTO } from "@/api/DTO/DeliveryFormDTO";
import { province } from "@/lib/constant";

interface CheckoutDeliveryInfoProps {
    deliveryInfo: DeliveryInfoDTO | undefined;
}

export default function CheckoutDeliveryInfo({
    deliveryInfo,
}: CheckoutDeliveryInfoProps) {
    const provinceName = province.find(
        (p) => Number(p.id) == Number(deliveryInfo?.province)
    )?.name;

    return (
        <div className="space-y-4 text-sm">
            <div className="flex space-x-2">
                <p className="text-medium w-5/12">Full Name</p>
                {deliveryInfo && (
                    <p className="text-right text-slate-500 w-7/12">
                        {deliveryInfo.name}
                    </p>
                )}
            </div>
            <div className="flex">
                <p className="text-medium w-5/12">Personal Email</p>
                {deliveryInfo && (
                    <p className="text-right text-slate-500 w-7/12">
                        {deliveryInfo.email}
                    </p>
                )}
            </div>
            <div className="flex">
                <p className="text-medium w-5/12">Phone Number</p>
                {deliveryInfo && (
                    <p className="text-right text-slate-500 w-7/12">
                        {deliveryInfo.phone}
                    </p>
                )}
            </div>

            <div className="flex">
                <p className="text-medium w-5/12">Province</p>
                    {deliveryInfo && (
                        <p className="text-right text-slate-500 w-7/12">
                            {provinceName}
                        </p>
                    )}
            </div>
            <div className="flex">
                <p className="text-medium w-5/12">Full Address</p>
                {deliveryInfo && (
                    <p className="text-right text-slate-500 w-7/12">
                        {deliveryInfo.address}
                    </p>
                )}
            </div>
            {
                deliveryInfo?.deliveryTime && (
                    <div className="flex">
                        <p className="text-medium w-5/12">Delivery Time</p>
                        <p className="text-right text-slate-500 w-7/12">
                            {new Date(deliveryInfo.deliveryTime).toLocaleString()}
                        </p>
                    </div>
                )
            }
            {
                deliveryInfo?.instructions && (
                    <div className="flex">
                        <p className="text-medium w-5/12">Instructions</p>
                        <p className="text-right text-slate-500 w-7/12">
                            {deliveryInfo.instructions}
                        </p>
                    </div>
                )
            }
        </div>
    );
}
