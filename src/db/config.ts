import mongoose from "mongoose";

export class Database {
    private connectionStatus: string;

    public get status(): string {
        return this.connectionStatus;
    }

    constructor() {
        this.connectionStatus = "Disconnected";
        let dsn = "mongodb://localhost:27017/eengine";

        mongoose.connect("mongodb://localhost:27017/eengine");
        // Connected handler
        mongoose.connection.on('connected', function (err) {
            console.log('Connected to mongo server at: ' + dsn);
            this.connectionStatus = "Connected";
        });

        // Error handler
        mongoose.connection.on('error', function (err) {
            console.log('Failed to connect to the Mongo server!!', err);
            this.connectionStatus = "Error";
        });

        //Reconnect when closed
        mongoose.connection.on('disconnected', function () {
            this.connectionStatus = "Disconnected";
            // self.connectToDatabase();
        });
    }
}