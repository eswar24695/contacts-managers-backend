const router = require("express").Router()
const { json } = require("body-parser");
const bodyParser = require("body-parser");
const contactsModel = require("../models/contactsModel");
router.use(bodyParser.json());
const { validateToken } = require("../middleware/auth");

//posting 

router.post('/api/v1/contacts',validateToken,async(req,res)=>{
    try{
        const arr = req.body;
        console.log("hitting-post");
        console.log(req.user)

         for(let i=0; i<arr.length; i++){
            
            await contactsModel.create({
                Name:arr[i].Name,
                Designation: arr[i].Designation,
                Company:arr[i].Company,
                Industry: arr[i].Industry,
                Email: arr[i].Email,
                PhoneNumber:arr[i].PhoneNumber,
                Country:arr[i].Country,
                userId:req.user
            });
         }

    res.status(200).json({
        status:"success",
        user:arr
    })
    }
    catch(e){
        res.json({
            err:e.message
        })
        
    }
});

router.get("/api/v1/contacts",validateToken,async(req,res)=>{
    try{
        
        const users = await contactsModel.find({userId:req.user});
        console.log("1",users);
        res.status(200).json({
            status:"success",
            users
        })
        // if(users.length){
        //     res.status(200).json({
        //         status:"success",
        //         users
        //     })
        // }
        // else{
        //     res.status(404).json({
        //         status:"failed"
        //     })
        // }
    }
    catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
});

router.get("/api/v1/contacts/:email",validateToken,async(req,res)=>{
    try{

        const user = await contactsModel.findOne({Email:req.params.email});
        if(user.Email){
            res.status(200).json({
                status:"success",
                user
            })
        }
        else{
            res.status(404).json({
                status:"failed",
                message:"user does not exists"
            })
        }
    }
    catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})




//delete contacts

router.delete("/api/v1/contacts/:id",validateToken,async(req,res)=>{
    console.log(req.params.id)
    try{

        const finddelete=await contactsModel.find({_id:req.params.id})
        const datadelete=await contactsModel.deleteOne({_id:req.params.id})
        return res.json({
            status:"deleted",
            finddelete
        })
    }
    catch(e){
        return res.json({
            status:"failed",
            message:e.message
        })
        
    }
})

module.exports = router