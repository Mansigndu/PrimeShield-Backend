import { createToken } from "../middleware/token.js";
import policy from "../model/policy.model.js";
import bcrypt from'bcrypt'

export async function  addpolicy (req,res) {
    const{policy_name,policy_type,coverage_amount,premium_amount,terms_conditions} = req.body
    const {id} = req.user
    console.log(req.body)
    try {
        const check = await policy.findOne({policy_name})
        if(check){
           return res.status(400).send("Already Exits")
        }
        const policyoption = new policy({
            policy_name,
            policy_type,
            coverage_amount,
            premium_amount,
            providerId:id,
            terms_conditions
        })
        await policyoption.save()
        res.status(201).send(policyoption)
        
    } catch (error) {
        console.log(error)
        res.status(500).send("INTERNAL SERVER ERROR")
        
    }
    
}
export async function policyGet(req,res){
    // const{policy_name} = req.body
    try {
        const getSpecificData = await policy.find().populate("providerId","full_name email")
        if(!getSpecificData){
            return res.status(404).send("NOT FOUND")
        }
        let token = createToken(getSpecificData)
         getSpecificData.token = token;
        //  await getSpecificData.save()
         res.cookie('authToken',token,{
            httponly:true
         })
         const authtype = getSpecificData.userType
         let data = {
            authtype,
            token
         }
        res.status(200).send(getSpecificData)
        
    } catch (error) {
        console.log(error)
        res.status(500).send("INTERNAL SERVER ERROR")
        
    }
}


export async function handleDelete(req,res) {
    const {id} =  req.params
    try {
        const data = await policy.findByIdAndDelete(id)
      
        return res.status(200).send("Succesfully Delete")
        
    } catch (error) {
        return res.status(500).send("SERVER ERROR")
    }
}

export async function handleUpdatePolicy(req, res) {
    const { id } = req.params;  // Get the ID from the request parameters
    const { policy_name, policy_type, coverage_amount, premium_amount } = req.body;  // Get updated fields from the request body

    try {
        // Find the policy by ID and update it
        const updatedPolicy = await policy.findByIdAndUpdate(id, {
            policy_name,
            policy_type,
            coverage_amount,
            premium_amount
        }, { new: true }); // The `{ new: true }` option ensures the updated document is returned

        // If the policy was not found, send a 404 error
        if (!updatedPolicy) {
            return res.status(404).send("Policy not found");
        }

        // Send the updated policy back in the response
        return res.status(200).json(updatedPolicy);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
}
