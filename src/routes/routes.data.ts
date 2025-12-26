import { Route } from './routes.types';
import Routes from "../module/routes";


const routes =[
    new Route("/auth",Routes.authRoute)
]


export default routes;