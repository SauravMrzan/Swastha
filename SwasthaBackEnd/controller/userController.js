//importing the necessary libraries and path

const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req , res)=>{

    const {name,email,phone,address,password} = req.body;
    if(!name || !email || !phone ||!address || !password)
    {
        return res.status(400).json({
            error: "Fill the form properly!"
        }
        )
    }
    try{
        const checkingUser = await User.findOne({where:{email}})
        if(checkingUser)
        {
            return res.status(400).json({error: "Email already exists"})
        }
        const saltRound = 10;
        const hashpassword = await bcrypt.hash(password, saltRound)
        const newUser = await User.create({name, email,phone,address,password: hashpassword});
        res.status(200).json({message: "User Successfully Created"})
        console.log(newUser);
    }
    catch(error){
        res.status(400).json({error: "Something Went Wrong"})
        console.log(error)
    }
}


const loginUser = async (req, res)=>{
    const {email,password} = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'email and password are required' });
        }
        try{
            const checkingUser = await User.findOne({where:{email}})
        if(!checkingUser)
        {
            return res.status(400).json({error: "Email does not exists"})
        }
        // Verify the password
        const isMatch = await bcrypt.compare(password, checkingUser.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

 // Generate a JWT token
        const token = jwt.sign(
            { id: checkingUser.id, username: user.username },
            process.env.JWT_SECRET || 'HJVVVJHAVJFUIGIJKABKFKBAF34984787831',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, username: user.username }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login user' });
    }
};
const getAll = async (req, res) => {
    try {
        //fetching all the data from users table
        const users = await Users.findAll();
        res.status(200).send({ data: users, message: "successfully fetched data" })
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

module.exports={loginUser,registerUser,getAll};



// import { Users } from "../model/loginSchema.js";


// /**
//  *  fetch all users
//  */
// const getAll = async (req, res) => {
//     try {
//         //fetching all the data from users table
//         const users = await Users.findAll();
//         res.status(200).send({ data: users, message: "successfully fetched data" })
//     } catch (e) {
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// }

// /** 
//  *  create new user
// */
// const create = async (req, res) => {
//     try {
//         const body = req.body;
//         console.log(req.body);

//         if (!body?.email || !body?.username || !body?.password || !body?.phone || !body?.address)
//             return res.status(500).send({ message: "Invalid payload" });

//         const user = await Users.create({
//             username: body.username,
//             email: body.email,
//             password: body.password,
//             phone: body.phone,
//             address: body.address
//         });

//         res.status(201).send({ data: user, message: "Successfully created user" });
//     } catch (e) {
//         console.log(e); // Log the error to understand the cause
//         res.status(500).json({ error: 'Failed to create user' });
//     }
// }


// /**
//  *  update existing user
//  */

// const update = async (req, res) => {

//     try {
//         const { id = null } = req.params;
//         const body = req.body;
//         console.log(req.params)
//         //checking if user exist or not
//         const oldUser = await Users.findOne({ where: { id } })
//         if (!oldUser) {
//             return res.status(500).send({ message: "User not found" });
//         }
//         oldUser.username = body.username;
//         oldUser.password = body.password || oldUser.password;
//         oldUser.email = body.email;
//         oldUser.phone = body.phone;
//         oldUser.address = body.address;
//         oldUser.save();
//         res.status(201).send({ data: oldUser, message: "user updated successfully" })
//     } catch (e) {
//         console.log(e)
//         res.status(500).json({ error: 'Failed to update users' });
//     }
// }

// /**
//  *  delete user 
//  */
// const delelteById = async (req, res) => {

//     try {
//         const { id = null } = req.params;
//         const oldUser = await Users.findOne({ where: { id } })

//         //checking if user exist or not
//         if (!oldUser) {
//             return res.status(500).send({ message: "User not found" });
//         }
//         oldUser.destroy();
//         res.status(201).send({ message: "user deleted successfully" })
//     } catch (e) {
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// }

// /**
//  *  fetch user by id
//  */
// const getById = async (req, res) => {

//     try {
//         const { id = null } = req.params;
//         const user = await Users.findOne({ where: { id } })
//         if (!user) {
//             return res.status(500).send({ message: "User not found" });
//         }
//         res.status(201).send({ message: "user fetched successfully", data: user })
//     } catch (e) {
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// }


// export const userController = {
//     getAll,
//     create,
//     getById,
//     delelteById,
//     update
// }