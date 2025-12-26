
import { Request, Response, type Express } from "express"
import cors from 'cors';
import { ResponseHandler } from '../utils/responseHAndler';
import { errorHandler } from '../middlerware/errorHandler';
import { pathLogger } from '../middlerware/logger';
import routes from './routes.data';

export const registerRoutes= (app:Express)=>{
  app.use(
    cors({
      origin: true, // Allow all origins
      credentials: true, // Allow cookies to be sent with requests
    })  
  );
app.use(pathLogger);
  app.get("/health",(req:Request,res:Response)=>{

    res.send(new ResponseHandler("Happy from outside healing from inside"))
  })

for(let route of routes){
  app.use(route.path,route.router)
}
  app.use(errorHandler);
}