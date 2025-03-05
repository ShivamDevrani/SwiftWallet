const ACCOUNT = require("../model/accountSchema");
const mongoose = require("mongoose");


// ---> very bad practice to use transactions in the server rather than use it in the database.......
// --> In MongoDb we can use transactions with the help of sessions

// async function getAccountBalance(req,res){
//      const userId=req.userId;

//      const account=await ACCOUNT.findOne({userId:userId});
//      res.status(200).json({balance:account.balance});
// }

// async function transferAmount(req,res){
//      const userId=req.userId;
//      const {to,amount}=req.body;

//      const fromAccount=await ACCOUNT.findOne({userId:userId});
//      if(fromAccount.balance<amount) return res.status(400).json({message:"Insufficient balance"});

//      fromAccount.balance-=amount;
//      await fromAccount.save();

//      const toAccount=await ACCOUNT.findOne({userId:to});

//      if(!toAccount) return res.status(400).json({message:"Invalid Account"});

//      toAccount.balance+=amount;
//      await toAccount.save();
    
//      res.status(200).json({message:"Transfer successful"});
// }


async function getAccountBalance(req,res){
     const userId=req.user.userId;
     const account=await ACCOUNT.findOne({userId:userId});
     res.status(200).json({balance:account.balance});
}

async function transferAmount(req,res){
    let session;
    try{
        const from=req.user.userId;
        const {to,amount}=req.body;

        session=await mongoose.startSession();

        session.startTransaction();

        const fromAccount=await ACCOUNT.findOne({userId:from}).session(session);

        if(!fromAccount || fromAccount.balance<amount)
        {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({message:"Insufficient balance"});
        }   
        
        fromAccount.balance-=amount;
        await fromAccount.save();

        const toAccount=await ACCOUNT.findOne({userId:to}).session(session);

        if(!toAccount)
        {
            await session.abortTransaction();
            session.endSession();

            return res.status(400).json({message:"Invalid Account"});
        }
        
        toAccount.balance+=amount;
        await toAccount.save();

        await session.commitTransaction();

        session.endSession();

        res.status(200).json({message:"Transfer successful"});

    }
    catch(err)
    {
        await session.abortTransaction();
        session.endSession();
        console.log(err);
        if (err.errorLabels && err.errorLabels.includes('TransientTransactionError')) {
            console.log('TransientTransactionError, retrying transaction...');
            return transferAmount(req,res); // Retry the transaction
        }
        return res.status(500).json({message:"Internal Server Error"});
    }
}



module.exports={getAccountBalance,transferAmount};

// testing the above functions
// async function transferAmount(req){
//     console.log('started');
//     const session=await mongoose.startSession();
//     try{
//         console.log('uooo');
//         const from=req.userId;
//         const {to,amount}=req.body;
//         console.log('session');
       
//          console.log('session started');
//         session.startTransaction();
       

//         const fromAccount=await ACCOUNT.findOne({userId:from}).session(session);

//         console.log(fromAccount);

//         if(!fromAccount || fromAccount.balance<amount)
//         {
//             console.log('problem');
//                 await session.abortTransaction();
//                 session.endSession();
//                 return;
//                 // return res.status(400).json({message:"Insufficient balance"});
//         }   
        
//         fromAccount.balance-=amount;
//         await fromAccount.save();

//         const toAccount=await ACCOUNT.findOne({userId:to}).session(session);

//         if(!toAccount)
//         {
//             console.log('probelm');
//             await session.abortTransaction();
//             session.endSession();
//              return;
//             // return res.status(400).json({message:"Invalid Account"});
//         }

//         console.log('intermediate');
        
//         toAccount.balance+=amount;
//         await toAccount.save();

//         await session.commitTransaction();

//         session.endSession();

//         console.log('done');
//         return;
//         // res.status(200).json({message:"Transfer successful"});

//     }
//     catch(err)
//     {
//         await session.abortTransaction();
//         session.endSession();
//         console.log(err);
//         if (err.errorLabels && err.errorLabels.includes('TransientTransactionError')) {
//             console.log('TransientTransactionError, retrying transaction...');
//             return transferAmount(req); // Retry the transaction
//         }
//         // return res.status(500).json({message:"Internal Server Error"});
//     }
// }

// transferAmount({
//     userId: "67c44453b9b2c6e3a1ea21ba",
//     body: {
//         to:"67c444ceb9b2c6e3a1ea21bf",
//         amount: 100
//     }
// })

// transferAmount({
//     userId: "67c444ceb9b2c6e3a1ea21bf",
//     body: {
//         to:"67c44453b9b2c6e3a1ea21ba",
//         amount: 200
//     }
// })
// transferAmount({
//     userId: "67c44d3824293ade04700d2f",
//     body: {
//         to:"67c44453b9b2c6e3a1ea21ba",
//         amount: 500
//     }
// })
// transferAmount({
//     userId: "67c44d3824293ade04700d2f",
//     body: {
//         to:"67c444ceb9b2c6e3a1ea21bf",
//         amount: 500
//     }
// })



