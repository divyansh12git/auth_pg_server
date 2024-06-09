import bcrypt from "bcrypt";


const saltRound=10;

const generateHash=async(text:string):Promise<string>=>{
    
    const hash:string=bcrypt.hashSync(text,saltRound);
    return hash;
}

const compareHash=async(data:string,hashval:string):Promise<boolean>=>{
    return bcrypt.compareSync(data,hashval);
}

export {
    generateHash,
    compareHash
};