import { createToken } from "../middleware/token.js"
import user from "../model/user.model.js"
import bcrypt from 'bcrypt'

 export async function addUser (req,res){ 
    const {full_name,email,phone,password,address,dob} = req.body
    // console.log(req.body)

    try{
      const check = await user.findOne({email})
      
      if(check){
       return res.status(400).send("Aiready Exists")
      }
      const typeOfUser = email === process.env.AdminEmail ? "admin" : "customer"
      const hashPassword = await bcrypt.hash(password,10)
      const useroption   = new user({
        full_name,
        email,
        phone,
        password: hashPassword,
        address,
        dob,
        userType : typeOfUser
      })
      await useroption.save()
      res.status(201).send(useroption)
    }
    catch(error){
      console.log(error)
     return res.status(500).send("INTERNAL SERVER ERROR")
    }
 }
 export async function userLogin(req,res){
  const{email,password} = req.body
  
  try {

    const getSpecificData = await user.findOne({email})
    if(!getSpecificData){
      return res.status(404).send("Not Found")
    }
    const isValidPassword = await bcrypt.compare(password, getSpecificData.password)
    if(!isValidPassword){
      return res.status(404).send("Wrong Email Or Password")
    }
    // Generate JWT token
    let token = createToken(getSpecificData)
    getSpecificData.token = token;
    await getSpecificData.save()

    res.cookie('authToken',token,{
      httpOnly:true
    })
const authtype = getSpecificData.userType
    let data = {
      authtype,
      token
    }

    res.status(200).send(data)
  
  } catch (error) {
    console.log(error)
    return res.status(500).send("SERVER ERROR")
    
  }
  
  }

  export async function  getUserData(req,res) {
    try {
      const check = await  user.find()
      if(check.length === 0){
        return res.status(400).send("User Not Find")
      }
      res.status(200).send(check)

      
    } catch (error) {
      console.log(error)
      res.status(500).send("SERVER ERROR")
      
    }
    
  }



  export async function  getSingleUserData(req,res) {
    const {id} = req.params
    try {
      const check = await  user.findOne({_id:id})
      if(!check){
        return res.status(400).send("User Not Find")
      }
      res.status(200).send(check)

      
    } catch (error) {
      console.log(error)
      res.status(500).send("SERVER ERROR")
      
    }
    
  }

  export async function handleUpdate(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      // 1. Fetch existing user to compare password
      const existingUser = await user.findById(id);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // 2. Only hash password if it's changed (and not already hashed)
      if (updateData.password && updateData.password !== existingUser.password) {
        const isHashed = updateData.password.startsWith('$2b$'); // bcrypt hash check
        if (!isHashed) {
          const hashPassword = await bcrypt.hash(updateData.password, 10);
          updateData.password = hashPassword;
        }
      }
  
      if (!Object.keys(updateData).length) {
        return res.status(400).json({ message: 'No fields provided for update' });
      }
  
      const updateAuth = await user.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
  
      if (!updateAuth) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json({ message: 'Update successful', updateAuth });
  
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  }
  

  export async function handleDelete(req,res){
    const{id}  = req.body
    console.log(id)
    try {
      const deleteData = await user.findByIdAndDelete(id)
      if(!deleteData){
        return res.status(400).send("NOT DELETE DATA")
      }
      res.status(200).send(deleteData)
      
    } catch (error) {
      console.log(error)
      res.status(500).send('SERVER ERROR')
      
    }
  }
  


    
  

  export async function  getSpecificUserData(req,res) {
    const {id} = req.user
    try {
      const check = await  user.findOne({_id:id})
      if(!check){
        return res.status(400).send("User Not Find")
      }
      res.status(200).send(check)

      
    } catch (error) {
      console.log(error)
      res.status(500).send("SERVER ERROR")
      
    }
    
  }