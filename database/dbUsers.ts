import User from "@/models/User";
import { db } from "."
import bcrypt from 'bcryptjs';

export const checkUserEmailPassword = async(email: string, password: string) => {
    await db.connect();
    const user = await User.findOne({email});
    await db.disconnect();

    if (!user) return null;

    if (!bcrypt.compareSync(password, user.password!)) return null;

    const {role, name, _id} = user;

    return {
        _id,
        email: email.toLowerCase(),
        role,
        name
    }
}

// Esta funcion crea o verifica un usuario de OAuth
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
    await db.connect();
    const user = await User.findOne({ email: oAuthEmail });

    if (user){
        const { role, name, _id, email } = user;
        await db.disconnect();
        return {
            _id,
            email: email.toLowerCase(),
            role,
            name
        }
    }

    const newUser = new User({email: oAuthEmail, name: oAuthName, password: '@', role: 'client'});
    await newUser.save();
    await db.disconnect();


    const { role, name, _id, email } = newUser;

    return {
        _id,
        email: email.toLowerCase(),
        role,
        name
    }
}