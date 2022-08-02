const userModel = require("../DB/model/User");
const jwt = require("jsonwebtoken")
const roles = {
    Admin: "Admin",
    User: "User",
}
const { UserInputError } = require("apollo-server-express");
const auth = async(BearerToken, accessRoles) => {
    try {
        const token = BearerToken.split("Bearer ")[1]
        if (!token) {
            throw new UserInputError('un-authanticated User')
        } else {
            const decoded = jwt.verify(token, process.env.tokenSignature);
            if (!decoded || !decoded.id) {
                throw new UserInputError('un-authanticated User')
            } else {
                const user = await userModel.findOne({ _id: decoded.id })

                if (!accessRoles.includes(user.role)) {
                    throw new UserInputError('un authorized user')
                } else {
                    return user
                }

            }
        }
    } catch (e) {
        throw new UserInputError('catch error auth', {
            e
        })

    }


}

module.exports = {
    auth,
    roles
}