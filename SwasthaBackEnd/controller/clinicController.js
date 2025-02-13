const Clinic = require('../model/Clinic');
const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerClinic = async(req,res)=>{
    const {name,pan,license,address,email,password} = req.body;
    if(!name || !pan || !license || !address || !email || !password){
        return res.status(400).json({
            error: "Fill the form properly!"
        })
    }
    try{
        const checkingClinic = await Clinic.findOne({where:{email}})
        if(checkingClinic){
            return res.status(400).json({error:"Email already exists"})
        }
        const saltRound = 10;
        const hashpassword = await bcrypt.hash(password, saltRound)
        const newClinic = await Clinic.create({name, pan,license,address,email,password: hashpassword});
        res.status(200).json({message: "User Successfully Created"})
        console.log(newClinic);
    }catch(error){
        res.status(400).json({error: "Something Went Wrong"})
        console.log(error)
    }
}
const loginClinic = async (req, res)=>{
    const {email,password} = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'email and password are required' });
        }
        try{
            const checkingClinic = await Clinic.findOne({where:{email}})
        if(!checkingClinic)
        {
            return res.status(400).json({error: "Email does not exists"})
        }
        // Verify the password
        const isMatch = await bcrypt.compare(password, checkingClinic.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

 // Generate a JWT token
        const token = jwt.sign(
            { id: checkingClinic.id, username: Clinic.name },
            process.env.JWT_SECRET || 'HJVVVJHAVJFUIGIJKABKFKBAF34984787831',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            Clinic: { id: user.id, username: Clinic.name }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login user' });
    }
};
module.exports={loginClinic,registerClinic};
