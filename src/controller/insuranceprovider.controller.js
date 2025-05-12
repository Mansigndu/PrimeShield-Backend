import { createToken } from "../middleware/token.js";
import Insurance from "../model/insuranceprovider.model.js";
import bcrypt from 'bcrypt'
import user from "../model/user.model.js";

export async function appendInsurance(req,res){
    const{ providerName,contactEmail,contactPhone,address }= req.body
    console.log(req.body)
    try {
        const Check = await Insurance.findOne({providerName:providerName})
        if(Check){
           return res.status(400).send("Aiready Exists")
        }

        const getdetail = await user.findOne({full_name:providerName})
        console.log(getdetail)
        const Insuranceoption = new Insurance({
            providerName,
            contactEmail,
            contactPhone,
            address,
            providerId:getdetail._id
        })
        await Insuranceoption.save()
        res.status(201).send(Insuranceoption)
    } catch (error) {
        console.log(error)
       return res.status(500).send("INTERNAL SERVER ERROR")
        
    }
}

export async function Insuranceobtain(req,res){
    try {
        const obtainspecificData = await Insurance.find().populate("providerId")
        // console.log(obtainspecificData)
        if(!obtainspecificData){
            return res.status(404).send("FOUND NOT")
        }
      
        res.status(200).send(obtainspecificData)
        
    } catch (error) {
        console.log(error)
        res.status(500).send("INTERNAL SERVER ERROR")
        
    }

}
