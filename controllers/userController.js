const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema');

const registerUser = async (req, res) => {
    try {
      const {name, email, password, passwordVerify } = req.body;
  
      // Validation
  
  
  
      if (!name , !email || !password || !passwordVerify) {
        res.status(400).json({ errormessage: "Please Enter all reequired Feild" });
      }
      
      if(password.length < 6){
          res.status(400).json({ errormessage: "Password length should be atleast 6 char" });
      }
      
      if(password != passwordVerify){
          res.status(400).json({ errormessage: "Enter the same passwod twice" });
      }
      
      const existingUser = await User.findOne({ email });
      if(existingUser)
      {
          return res.status(400).json({ errormessage: "An account with this email already exists" });
      }
  
     
  
      // console.log(existingUser);
  
      // Hash the password
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password , salt);
  
      // console.log(passwordHash);
  
  
      // Save the new user account to the database
  
      const newuser = new User({
        name,email , passwordHash
      })
  
      const savedUser = await newuser.save();
  
      // sign the token
  
      const token = jwt.sign({
        user  : savedUser._id
      } , process.env.JWT_SECRATE)
  
      // Send the token in a HTTP-only cookie
  
      res.cookie("token" , token , {
        httpOnly:true,
        secure:true,
        sameSite:"none"
      }).send();
  
  
      //
  
  
  
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }


const loginUser =  async (req , res)=>
{
  try {
    const { email, password } = req.body;

    //validate
    if (!email || !password) {
      res.status(400).json({ errormessage: "Please Enter all reequired Feild" });
    }
    
    const existingUser = await User.findOne({email});

    if(!existingUser)
      return res.status(400).json({ errormessage: "Wrong Email or password" });
    
      
    const passwodCorrect = await bcrypt.compare(password , existingUser.passwordHash);

    if(!passwodCorrect)
      return res.status(400).json({ errormessage: "Wrong Email or password" });
    
     // sign the token

     const token = jwt.sign({
      user  : existingUser._id
    } , process.env.JWT_SECRATE)

    // Send the token in a HTTP-only cookie

    res.cookie("token" , token , {
      httpOnly:true,
      secure:true,
      sameSite:"none",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }).send();



  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}



// 3, Log Out

const logoutUser = (req , res)=>{
    res.cookie("token" , "" , {httpOnly:true,
      secure:true,
      sameSite:"none" , expires : new Date(0)}).send();
  }


//4. Authenticate

const authenticateUser = (req , res)=>{
  try {
    const token = req.cookies.token;
    console.log("Token:", token); // Log the token to see if it's present

    if (!token)
      return res.json(false);

    jwt.verify(token, process.env.JWT_SECRATE);
    console.log("Token is valid"); // Log that the token is valid

    res.send(true);
    
  } catch (error) {
    console.error(error); // Log any errors during authentication
    res.json(false);
  }
}

const getUserData = async (req , res) =>
{
    try {

        const userdata = await User.findById(req.user)

        res.json(userdata);
    }  
     catch (error) {
      console.error(error);
      res.status(500).send();
    }
}


  module.exports = {registerUser , loginUser ,logoutUser , authenticateUser , getUserData};