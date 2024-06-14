import "next-auth";

declare module 'next-auth' {
    export interface Session {
        access_token: string
        exp:number,
        error:string,
        admin:boolean,
        manager:boolean
    }
}