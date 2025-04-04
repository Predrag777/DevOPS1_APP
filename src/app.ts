import express, { Application } from "express";
import cors from "cors";
import ip from "ip";

import { HttpResponse } from "./domain/response";
import {Code} from "./enum/code.enum";
import {Status} from "./enum/status.enum";
import patientRoutes from "./routes/patient.routes";



export class App {
    private readonly app: Application;
    private readonly APPLICATION_RUNNING = 'application is running on: ';
    private readonly ROUTE_NOT_FOUND = "Route does not exist on the server";

    constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 3000){
        this.app=express();
        this.middleWare();
        this.routes();
    }

    listen(): void{
        this.app.listen(this.port);
        console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`)
    }

    private middleWare(): void{
        this.app.use(cors({origin: '*'}));// NEver do this in real life!!!
        this.app.use(express.json());

    }

    routes(){
        this.app.use('/patients', patientRoutes);
        this.app.use('/', (req, res)=>{res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, "Welcome to the Patients API V1.0"))});
        this.app.use('*', (req, res)=>{res.status(200).send({message: this.ROUTE_NOT_FOUND})});
    }
}