import { TransactionDTO } from "@/api/DTO/InvoiceDTO";

interface TransactionInfoProps {
    transaction: TransactionDTO;
}
export default function TransactionInfo({ transaction }: TransactionInfoProps) {
    const formmater = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <div className="space-y-4 text-sm">
            <div className="flex space-x-2">
                <p className="text-medium w-5/12">Transaction ID</p>
                {transaction && (
                    <p className="text-right text-slate-500 w-7/12">
                        {transaction.transactionId}
                    </p>
                )}
            </div>
            <div className="flex space-x-2">
                <p className="text-medium w-5/12">Transaction Number </p>
                {transaction && (
                    <p className="text-right text-slate-500 w-7/12">
                        {transaction.transactionNum}
                    </p>
                )}
            </div>
            <div className="flex space-x-2">
                <p className="text-medium w-5/12">Transaction Content</p>
                {transaction && (
                    <p className="text-right text-slate-500 w-7/12">
                        {transaction.transactionContent}
                    </p>
                )}
            </div>
            <div className="flex space-x-2">
                <p className="text-medium w-5/12">Transaction Date</p>
                {transaction && (
                    <p className="text-right text-slate-500 w-7/12">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                )}
            </div>
            <div className="flex space-x-2">
                <p className="text-medium w-5/12">Message</p>
                {transaction && (
                    <p className="text-right text-slate-500 w-7/12">
                        {transaction.message}
                    </p>
                )}
            </div>
            <div className="flex space-x-2">
                <p className="text-medium w-5/12">Amount</p>
                {transaction && (
                    <p className="text-right text-slate-500 w-7/12">
                        {formmater.format(transaction.amount)}
                    </p>
                )}
            </div>
        </div>
    );
}
