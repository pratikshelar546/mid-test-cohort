import { Route } from './routes.types';
import Routes from "../module/routes";


const routes =[
    new Route("/auth",Routes.authRoute),
    new Route("/class",Routes.classRoute)
]


export default routes;