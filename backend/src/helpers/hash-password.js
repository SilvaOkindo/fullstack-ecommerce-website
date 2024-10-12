import bcrypt from "bcryptjs"


const saltRounds = 10

export const hashPassword = (password) => {
    const salt1 = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(password, salt1)
}