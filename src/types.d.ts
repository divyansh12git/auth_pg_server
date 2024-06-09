type UserDataForSignIn={
    username:string,
    password:string
}

type UserfromDB={
    id:Number,
    username:string,
    password_hash:string
}

export {
    UserDataForSignIn,
    UserfromDB
};