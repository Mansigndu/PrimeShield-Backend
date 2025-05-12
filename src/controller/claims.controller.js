import { createToken } from "../middleware/token.js";
import claim from "../model/claims.model.js";
import bcrypt from 'bcrypt'
import Insurance1 from "../model/insurance.model.js";
import policy from "../model/policy.model.js";
import Form from "../model/form.model.js";

export async function expandclaim(req, res) {
    const { claimAmount, reason, cancelForType } = req.body;
    const { id } = req.user;
    const { cancelFor } = req.params;  // Use cancelFor from URL

    try {
        // Check if a claim already exists for this user and cancelFor type
        const check = await claim.findOne({ userId: id, CancelFor: cancelFor });
        if (check) {
            return res.status(400).send("Claim already exists for this user with this CancelFor value.");
        }

        // Check if a Form with ApplyFor equal to cancelFor exists
        const checkForm = await Form.findOne({ ApplyFor: cancelFor });
        if (!checkForm) {
            console.log(`No Form found with ApplyFor value: ${cancelFor}`);
            return res.status(404).send("Form not found with the specified ApplyFor value.");
        }

        console.log(`Form found: ${JSON.stringify(checkForm)}`); // Debugging: Log the form

        // Create and save the new claim
        const claimOption = new claim({
            userId: id,
            claimAmount,
            claimStatus: 'pending',
            reason,
            CancelFor: cancelFor,
            cancelForType,
        });

        await claimOption.save();

        // Try deleting the Form
        const deleteResult = await Form.deleteOne({ ApplyFor: cancelFor });

        // Check if the deletion was successful
        if (deleteResult.deletedCount === 0) {
            console.log(`No Form deleted with ApplyFor value: ${cancelFor}`);
        } else {
            console.log(`Form successfully deleted with ApplyFor value: ${cancelFor}`);
        }

        // Send the response with the created claim
        res.status(201).send(claimOption);

    } catch (error) {
        console.error("Error occurred: ", error);
        res.status(500).send("INTERNAL SERVER ERROR");
    }
}



export async function claimAttain(req, res) {
    

    try {
        const userClaims = await claim.find();

        if (userClaims.length === 0) {
            return res.status(404).send("No claims found for this user.");
        }

        res.status(200).send(userClaims);

    } catch (error) {
        console.error(error);
        res.status(500).send("INTERNAL SERVER ERROR");
    }
}


export async function InsurancePolicy(req, res) {
    console.log("you are ghhere")
    const { id } = req.params;  // Get the insurance or policy id from the URL

    try {
        // Check in Insurance1 model first
        let detail = await Insurance1.findById(id);
        
        // If not found, check in the policy model
        if (!detail) {
            detail = await policy.findById(id);
        }

        // console.log(detail,"hgdfcyiagscyiiagydgchgqihegcvhasgcm")
        // If still no data found, return a 404
        if (!detail) {
            return res.status(404).send("No Insurance or Policy found for this ID.");
        }
        // Return the found detail
        res.status(200).send(detail);

    } catch (error) {
        console.error(error);
        res.status(500).send("INTERNAL SERVER ERROR");
    }
}

// In your claimController.js
export const updateClaimStatus = async (req, res) => {
    try {
      const {  status } = req.body;
      const {id} = req.params
  
      // Validate status
      if (!["approved", "disapproved", "pending"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
  
      // Update claim status
      const updatedClaim = await claim.findByIdAndUpdate(
       id,
        { claimStatus: status },
        { new: true } // Return the updated document
      );
  
      if (!updatedClaim) {
        return res.status(404).json({ message: "Claim not found" });
      }
  
      res.status(200).json(updatedClaim);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  