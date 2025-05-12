import Insurance1 from "../model/insurance.model.js"
export async function handleInsurance  (req,res) {
    const{InsuranceName,InsurancePrice,InsuranceTiming } = req.body
    // console.log(req.body)
    try {
        const check = await Insurance1.find({InsuranceName})
        console.log(check)
        if(check.length!==0){
           return res.status(400).send('already exist')
        }
        const option = new Insurance1({
            InsuranceName,
            InsurancePrice,
            InsuranceTiming
        })
        await option.save()
        res.status(200).send('sucess')

        
    } catch (error) {
        console.log(error)
       return res.status(500).send("INTERNAL SERVER ERROR")
        
    }
    
}
export async function handleGetInsurance(req,res) {
    console.log("You are here");
    
    try {
        const retrieveData= await Insurance1.find()
        console.log(retrieveData)
        res.status(200).send(retrieveData)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
        
    }
    
}



export async function handleupdateInsurance(req, res) {
    const { id } = req.params; // Get the insurance ID from the request parameters
    const { InsurancePrice, InsuranceTiming } = req.body; // Get the new price and timing from the request body

    console.log("You are here");

    try {
        // Find the insurance by ID
        const insurance = await Insurance1.findById(id);
        
        if (!insurance) {
            return res.status(404).send("Insurance not found");
        }

        // Update the insurance fields with new values
        insurance.InsurancePrice = InsurancePrice || insurance.InsurancePrice; // Only update if new value is provided
        insurance.InsuranceTiming = InsuranceTiming || insurance.InsuranceTiming;

        // Save the updated insurance document
        const updatedInsurance = await insurance.save();

        console.log("Updated insurance:", updatedInsurance);

        // Send the updated insurance data back as the response
        res.status(200).json(updatedInsurance);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}


export async function handleDeleteInsurance(req, res) {
    const { id } = req.params; // Get the insurance ID from the request parameters
   

    try {
        // Find the insurance by ID
        const insurance = await Insurance1.findByIdAndDelete(id);
       
        res.status(200).json("Delete Successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}