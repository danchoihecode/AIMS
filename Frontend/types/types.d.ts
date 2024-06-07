declare type ResponseData = {
    error:string,
    ok:boolean,
    status:number,
    url:string
}

declare type LoginResponseData={
    error:object,
    token:string,
    expiresIn:number,
    admin: boolean, 
    manager: boolean 
}

declare type RegisterResponseData = any