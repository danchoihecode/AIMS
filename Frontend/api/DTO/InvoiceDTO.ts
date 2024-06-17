export interface TransactionDTO {
    transactionId: string;
    transactionNum: string;
    transactionContent: string;
    createdAt: Date;
    message: string;
    amount: number;
    errorCode: string;
}