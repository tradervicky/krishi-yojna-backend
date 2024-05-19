const {z} = require('zod')
// auth validate 
const signup = z.object({
    name: z.string(),
    password : z.string().min(6).max(12),

})

const login = z.object({
    name: z.string(),
    password : z.string().min(6).max(12),
    email : z.string()
})

exports.validateLogin = login.partial();
exports.validateSignup = signup.partial();