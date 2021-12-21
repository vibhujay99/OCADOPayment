const express = require('express');
const Address = require('../models/address');


const router  = express.Router();

//Save Address

router.post('/address/save', (req,res) => {

    let newAddress = new Address(req.body);

    newAddress.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Address saved Successfully"
        });
    });
});

//Get Address

router.get('/address',(req,res)=>{
    Address.find().exec((err,address)=>{
        if(err){
            return res.status(400).json({
                error :err
            });
        }
        return res.status(200).json({
            success:true,
            existingAddress:address
        });
    });
});

//update Address
router.put('/address/update/:id',(req,res)=>{
    Address.findByIdAndUpdate(
        req.params.id,{
            $set:req.body

        },
        (err,address)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});

router.delete('/address/delete/:id',(req,res)=>{
    Address.findByIdAndDelete(req.params.id).exec((err,deleteAddress)=>{
        if(err) return res.status(400).json({
            message: "Delete unSuccessfully",err
        });
        return res.json({
            message:"Deleted Successfully",deleteAddress
        });
    });
});

//Get a specific address
router.get('/address/:id',(req,res)=>{
    let addressId = req.params.id;

    Address.findById(addressId,(err,address)=>{
        if(err){
            return res.status(400).json({
                success:false,
                err
            });
        }
        return res.status(200).json({
            success:true,
            address
        });
    });
})


module.exports = router;