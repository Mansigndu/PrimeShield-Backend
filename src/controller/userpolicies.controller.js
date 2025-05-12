import { createToken } from "../middleware/token.js";
import userPolicy from "../model/userpolicies.js";
import bcrypt from 'bcrypt'

export async function attachuserpolicy(req,res){
    const{userId,policyId,status }=req.body
    console.log(req.body)
    try {
        const check = await userPolicy.findOne({userId,policyId})
        if (check) {
          return  res.status(400).send("ALREADY EXISTS")
        }
        const userPolicyoption = new userPolicy({
            userId,
            policyId,
            status
        })
        await userPolicyoption.save()
        res.status(201).send(userPolicyoption)
    } catch (error) {
        console.log(error)
        res.status(500).send("INTERNAL SERVER ERROR")
        
    }
}

export async function userpolicyAcquire(req,res){
    try {
        const AcquirespecificData = await userPolicy.find().populate([
           { path:"userId",select:"full_name email"},
           {path:"policyId",select:"policy_name policy_type"}
        ])
        res.status(200).send(AcquirespecificData)
        
    } catch (error) {
        console.log(error)
        res.status(500).send("INTERNAL SERVER ERROR")
        
    }
    
}

export async function userpolicyDelete(req,res) {
    const{id} = req.body
    console.log(id)
    try {
        const deleteData =  await userPolicy.findByIdAndDelete({_id:id})
        if(!deleteData){
            return res.status(400).send("NOT DELETE DATA")
        }
        res.status(200).send(deleteData)
    } catch (error) {
        console.log(error)
        res.status(500).send("SERVER ERROR")
        
    }
    
}