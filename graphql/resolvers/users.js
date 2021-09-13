const bcrypt = require('bcryptjs') //used for hashing or encrypting passwords 
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')//apollo's way of return errors I THINK

const {validateRegisterInput, validateLoginInput} = require('../../util/validators')
const { SECRET_KEY } = require('../../config')
const User  = require('../../models/User')

//resolver for user accounts

//generates a JSON web token for each user to login/register with 
function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, SECRET_KEY, {expiresIn: '1h'})
}

module.exports = {
    Mutation:{
        async login(_, {username, password}){
            //checks for input-side errors like empty inputs
            const {errors, valid} = validateLoginInput(username, password)
            //if there are input-side errors, present them
            if(!valid){
                throw new UserInputError('Errors', {errors})
            }

            //check for database-side errors like wrong password
            //wrong username
            const user = await User.findOne({username})
            if(!user){
                errors.general = 'User not found'
                throw new UserInputError('User not found', {errors})
            }
            //wrong password
            const match = await bcrypt.compare(password, user.password)
            if(!match){
                errors.general = 'Wrong credentials'
                throw new UserInputError('Wrong credentials', {errors})
            }

            //generate json web token that hides info of user
            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        async register(_, {registerInput: {username, email, password, confirmPassword}}){
            //Validate user data
            //this will call our validator register function which will check for input-side errors like incorrect email adresses 
            //or too long usernames. It will then return valid for true or false, and also any errors
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword)

            //if there are any input-side errors then return them
            if(!valid){
                throw new UserInputError('Errors', { errors})
            }
            //make sure user with that username doesnt already exist
            const user = await User.findOne({ username })
            if(user){
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            //hashes password 12 times to encrypt
            password = await bcrypt.hash(password, 12)

            //then makes a new user (referring to the User model) with these variables
            const newUser = new User ({
                email, 
                username, 
                password,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save()

            //generates a json web token for it that hides info of new user
            const token = generateToken(res)

            
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}