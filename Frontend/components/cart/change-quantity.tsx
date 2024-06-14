import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import {
    updateCartItemQty
} from "@/api/DTO/apifunc";
import { MinusIcon, PlusIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
const isValidQty = async (itemId: string, qty: string) => {
    if (/^[0-9]*$/.test(qty) === false) {
        toast.error("Quantity must be a number");
        return false;
    }
    const parsedQty = parseInt(qty);
    if (isNaN(parsedQty) || parsedQty < 0 || parsedQty > 100) {
        toast.error("You can only order between 1 and 100 items");
        return false;
    }
    const response = await updateCartItemQty(itemId, parsedQty);
    if (!response) {
        toast.error("The quantity is out of stock");
    }
    return response;
};

interface ChangeQuantityProps {
    item: CartItemDTO;
    setCartItems: any;
}

export default function ChangeQuantity({ item, setCartItems } : ChangeQuantityProps) {
    const handleChangeQty = async (qty: string | number) => {
        const isValid = await isValidQty(item.productId, qty.toString());
        if (!isValid) return;
        setCartItems((prev: CartItemDTO[]) => {
            return prev.map((i: CartItemDTO) => {
                if (i.productId === item.productId) {
                    return {
                        ...i,
                        quantity: qty,
                    };
                }
                return i;
            });
        });
    };
    return (
        <div className="space-x-2 flex items-center">
                <Button
                    variant="secondary"
                    size="icon"
                    className="shrink-0"
                    onClick={async () => {
                        handleChangeQty(item.quantity - 1);
                    }}
                >
                    <MinusIcon size={16} />
                </Button>
                <Input
                    className="w-12"
                    value={item.quantity}
                    onChange={async (e) => {
                        const value = e.target.value;
                        handleChangeQty(value);
                    }}
                />
                <Button
                    variant="secondary"
                    size="icon"
                    className="shrink-0"
                    onClick={() => {
                        handleChangeQty(item.quantity + 1);
                    }}
                >
                    <PlusIcon size={16} />
                </Button>
            </div>
    );
}
