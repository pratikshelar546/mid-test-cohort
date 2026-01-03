import mongoose, { connect, connection, Connection } from "mongoose";

class Database {
    private static instance :Database;
    private  connection: typeof mongoose | null = null;
    private connectionPromise : Promise<typeof mongoose >| null = null;

    private constructor(){}

    public static getInstance():Database{
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect():Promise<typeof mongoose>{
        if(this.connection && mongoose.connection.readyState ===1){
            return this.connection
        }

        if(this.connectionPromise){
            return this.connectionPromise
            
        }

        const url = process.env.MONGO_CONNECTION_URL||"mongodb://localhost:27017/attendace-managment";

        try{
            this.connectionPromise = mongoose.connect(url,{
                autoIndex:true
            })
            console.log("connected to mongodb");
            this.connection = await this.connectionPromise;
            return this.connection;
            
        }catch(error){
            console.log("error while connecting to Database", error);
            
            throw error
        }
    }

    public async disconnect():Promise<void>{
        await mongoose.disconnect();
        this.connection =null;
        console.log("Disconnected from database");
        
    }
}

export const connectDb = ()=>Database.getInstance().connect();