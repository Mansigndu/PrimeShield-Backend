import { createToken } from "../middleware/token.js";
import Form from "../model/form.model.js";
import Insurance1 from "../model/insurance.model.js";
import policy from "../model/policy.model.js";
import user from "../model/user.model.js";

export async function handleForm(req, res) {
    const { Name, Gender,  MobileNumber, Address, FamilyMember } = req.body;
    const { id: ApplyFor } = req.params;
    const {id} = req.user
  
    try {

            // Find user
      const userDetail = await user.findOne({ _id:id });
      if (!userDetail) {
        return res.status(400).send("Please register before submitting the form");
      }
      const Email = userDetail.email
      // Check if form with this email already exists
      const existingForm = await Form.findOne({ Email,ApplyFor });
      if (existingForm) {
        return res.status(400).send("Form already submitted ");
      }
  
  
  
      // Determine applyForType
      let applyForType = null;
  
      const insuranceExists = await Insurance1.findById(ApplyFor);
      if (insuranceExists) {
        applyForType = "Insurance1";
      } else {
        const policyExists = await policy.findById(ApplyFor);
        if (policyExists) {
          applyForType = "policy";
        } else {
          return res.status(404).send("Invalid ApplyFor ID");
        }
      }
  
      // Save form
      const newForm = new Form({
        Name,
        Gender,
        Email,
        MobileNumber,
        Address,
        FamilyMember,
        userId: userDetail._id,
        status: "Pending",
        ApplyFor,
        applyForType,
      });
  
      await newForm.save();
      res.status(200).send(newForm);
  
    } catch (error) {
      console.error("Form submission error:", error);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }

export async function formGet(req, res) {
    try {
        const getSpecificData = await Form.find()
        if (!getSpecificData) {
            return res.status(404).send("NOT FOUND")
        }

        res.status(200).send(getSpecificData)

    } catch (error) {
        console.log(error)
        res.status(500).send("INTERNAL SERVER ERROR")

    }
}

export async function handleUpdateStatus(req, res) {
    const { status } = req.body
    const { id } = req.params
    try {


        const updatedDoc = await Form.findByIdAndUpdate(id, { status }, { new: true });
        return res.json(updatedDoc);

    } catch (error) {
        console.log(error)
        return res.status(500).send("SERVER ERROR")
    }
}

export async function formUserGet(req, res) {
    const { id } = req.user;
    try {
        const getSpecificData = await Form.find({ userId: id }).populate("ApplyFor")

        
        if (!getSpecificData || getSpecificData.length === 0) {
            return res.status(404).send("NOT FOUND");
        }
        console.log(getSpecificData)
        res.status(200).send(getSpecificData);
    } catch (error) {
        console.error("Error fetching user data:", error); // Log error to console
        res.status(500).send("INTERNAL SERVER ERROR");
    }
}


export async function formGetById(req, res) {
  const { id } = req.params;
  console.log(id)
  try {
      const getSpecificData = await Form.findOne({ _id: id }).populate("ApplyFor")
      console.log(getSpecificData)

      
      if (!getSpecificData || getSpecificData.length === 0) {
          return res.status(404).send("NOT FOUND");
      }
      console.log(getSpecificData)
      res.status(200).send(getSpecificData);
  } catch (error) {
      console.error("Error fetching user data:", error); // Log error to console
      res.status(500).send("INTERNAL SERVER ERROR");
  }
}

export async function handleDeleteForm(req, res) {
  const { id } = req.params;
  try {

    const fetch = await Form.findOne({_id:id})
    console.log(fetch)
      const getSpecificData = await Form.findByIdAndDelete(id)

      
    
      res.status(200).send("Delete SuucessFully");
  } catch (error) {
      console.error("Error fetching user data:", error); // Log error to console
      res.status(500).send("INTERNAL SERVER ERROR");
  }
}