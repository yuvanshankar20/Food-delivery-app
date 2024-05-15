const express = require('express')
const app=express()
const port =process.env.PORT || 5000
const cors =require('cors')

//middleware connected to frontend
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello world!")
})

const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const uri="mongodb+srv://Food-app:Foodapp123@cluster0.hfyydkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client =new MongoClient(uri,{
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true,
    }
});

async function run(){
    try{
        //connect the client to the server
        await client.connect();

        //create a collection of database
        const FoodCollections=client.db("food_collections").collection("Foods");

        app.post("/upload.food",async (req, res) => {
            const data=req.body;
            const result=await FoodCollections.insertOne(data);
            res.send(result);
        })

        app.get("/all-foods",async(req, res)=>{
            const Foods=FoodCollections.find();
            const result=await Foods.toArray();
            res.send(result);
        })
        app.get("/foods/:id",async(req, res)=>{
            const id=req.params.id;
            const filter={_id:new ObjectId(id)};
            const result=await FoodCollections.findOne(filter);
            res.send(result);
        })

        app.patch('/food/:id',async(req,res)=>{
            const id=req.params.id;
            const updateFooddata=req.body;
            const filter={_id:new ObjectId(id)};

            const updateDoc={
                $set:{
                    ...updateFooddata
                },
            }
            const options ={upsert:true};
            const result=await FoodCollections.updateOne(filter,updateDoc,options);
            res.send(result);
        })

        app.delete('/food/:id',async(req,res)=>{
            const id=req.params.id;
            const filter={_id:new ObjectId(id)};
            const result=await FoodCollections.deleteOne(filter);
            res.send(result);
        })

        await client.db("admin").command({ping:1});
        console.log("Pinged your deployment , succesfully connected to mongodb");
    }
    finally{

    }
}
run().catch(console.dir);

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})