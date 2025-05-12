import { createToken } from "../middleware/token.js";
import reviews from "../model/reviews.model.js";

export async function joinreviews(req,res){
    const{ name,reviewText } = req.body
    const {email} = req.user
    console.log(req.body)

try {
   
    const reviewsoption = new reviews({
        name,
        email,
        reviewText
    })
    await  reviewsoption.save()
    res.status(201).send(reviewsoption)
}
 catch (error) {
    console.log(error)
    res.status(500).send("INTERNAL SERVER ERROR")
    
}
}
export async function reviewsgain(req,res){
    try {
        const gainspecificData  = await reviews.find()
        console.log(gainspecificData)
        if(!gainspecificData){
            return res.status(404).send("NOT FOUND")
        }
       

        res.status(200).send(gainspecificData)
    }
     catch (error) {
        console.log(error)
        res.status(500).send("INTERNAL SERVER ERROR")
    }

}

export async function handleDeleteReview(req, res) {
    const { id } = req.params;
   

    try {
        
        const review= await reviews.findByIdAndDelete(id);
       
        res.status(200).json("Delete Successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}