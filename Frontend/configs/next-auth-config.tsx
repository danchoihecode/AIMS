import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 6*60;            // 6 minutes
export const getCurrentEpochTime = () => {
    return Math.floor(new Date().getTime() / 1000);
};
const SIGN_IN_HANDLERS:any = {
    "login": async (user:any, account:any) => {
        if(user?.error){
            throw new Error( 'Email or Password is wrong\n');
        }
        return true;
    },
    "register": async (user:any, account:any) => {
        if(user?.error){
            throw new Error( 'Register failed ' + 'Status: ' + user.error.status);
        }else{
            return true;
        }
    },
    "change-password": async (user:any, account:any) => {
        if(user?.error){
            throw new Error( 'Change password failed ' + 'Status: ' + user.error.status);
        }else{
            return true;
        }
    }
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

export const authOption:NextAuthOptions = {
    providers:[
        CredentialsProvider(
            {
                id:"login",
                name:"Credentials",
                credentials:{
                    email:{label:"Email",type:"email"},
                    password:{label:"Password",type:"password"}
                },
                async authorize(credentials){
                    const res = await fetch(process.env.BACK_END_URL + "/auth/login",{
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers:{ "Content-Type": "application/json" },
                        cache: "no-store"
                    })

                    if (res.ok){
                        const data = await res.json()
                        if(data) return data
                    }else{
                        return {error: {status:res.status, message:res.statusText}}
                    }
                }
            }
        ),
        CredentialsProvider(
            {
                id:"register",
                name:"Register",
                credentials:{
                    email:{label:"Email",type:"email"},
                    fullName:{label:"FullName",type:"text"},
                    password:{label:"Password",type:"password"}
                },
                async authorize(credentials) {
                    const res = await fetch(process.env.BACK_END_URL + "/auth/signup", {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: {"Content-Type": "application/json"},
                        cache: "no-store"
                    })

                    if (res.ok) {
                        return {message: "register success"} as any
                    } else {
                        return {error:{status:res.status,message:res.statusText}};
                    }
                }
            }
        ),
        CredentialsProvider(
            {
                id:"change-password",
                name:"Change Password",
                credentials:{
                    token:{label:"Token",type:"text"},
                    newPassword:{label:"New Password",type:"password"}
                },
                async authorize(credentials) {
                    const res = await fetch(process.env.BACK_END_URL + "/auth/change-password", {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: {"Content-Type": "application/json"},
                        cache: "no-store"
                    })

                    if (res.ok) {
                        return {message: "change password success"} as any
                    } else {
                        return {error:{status:res.status,message:res.statusText}};
                    }
                }
            }
        )
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy:"jwt",
        maxAge:BACKEND_ACCESS_TOKEN_LIFETIME
    },
    callbacks:{
        async signIn({user,account}){
            if (account && !SIGN_IN_PROVIDERS.includes(account.provider)) return false;
            return account ? SIGN_IN_HANDLERS[account.provider](
                user, account
            ): false;
        },
        async jwt({user, token, account}) {
            if (user && account) {
                let backendResponse:LoginResponseData = SIGN_IN_PROVIDERS.includes(account.provider) ? user as unknown as LoginResponseData : account as unknown as LoginResponseData;
                token.access_token = backendResponse.token;
                token.admin = backendResponse.admin;
                token.manager = backendResponse.manager;
            }
            return token
        },
        async session({ session, token }) {
            session.access_token = token.access_token as string;
            session.admin = token.admin as boolean;
            session.manager = token.manager as boolean;
            return session;
        }

    }

}