import { Route } from './routes.types';
import Routes from "../module/routes";


const routes =[
    new Route("/auth",Routes.authRoute),
    new Route("/",Routes.classRoute)
]


export default routes;