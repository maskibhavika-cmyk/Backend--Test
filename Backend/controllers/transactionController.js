const transactionModel = require("../models/transactionModel")

const transactionCreateController = async (req, res) => {
    try{
        const {title,amount,type,category,expense,date} = req.body
        if(!title || !amount || !type || !category || !expense || !date){
            return res.status(500).send({
                success:false,
                message:'Please provide all fields'
            })
        }

        const newTransaction = new transactionModel({
            title,
            amount,
            type,
            category,
            expense,
            date
        })
        await newTransaction.save()
        res.status(200).send({
            success:true,
            message:'new transaction created',
            newTransaction
        })

    } catch(error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in create API",
            error
        })
    }
}

const getAllTransactionController = async (req, res) => {
    try{
        const transaction = await transactionModel.find({})
        if(!transaction) {
            return res.status(404).send({
                success:false,
                message:"no transaction found"
            })
        }

        res.status(200).send({
            success:true,
            totalTransaction:transaction.length,
            transaction
        })

    } catch(error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in getAll API",
            error
        })
    }

}


const deleteTransactionController = async (req, res) => {
    try{
    const transactionId = req.params.id
     if(!transactionId) {
        return res.status(404).send({
            success:false,
            message:"Provide transaction ID"
        })
     }

     const transaction = await transactionModel.findById(transactionId)
     if(!transaction){
        return res.status(404).send({
            success:false,
            message:"No transaction found id"
        })
     }

     await transactionModel.findByIdAndDelete(transactionId)
     res.status(200).send({
        success:true,
        message:"transaction deleted successfully"

     })

    } catch(error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in delete API",
            error
        })
    }
}

module.exports = {transactionCreateController, getAllTransactionController,deleteTransactionController}