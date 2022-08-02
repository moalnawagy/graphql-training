const { roles } = require("../../middlwear/auth")

const endPoint = {
    profile: [roles.User, roles.Admin]
}

module.exports = endPoint