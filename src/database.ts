import mongoose from 'mongoose';
import defaults from '../config/defaults';

export const connectDatabase = () => {
    mongoose.connect(defaults.databaseConnectionString)
    const dataBase = mongoose.connection;
    dataBase.on("error", console.error.bind(console, "connection error: "));
    dataBase.once("open", function () {
        console.log("Database Connected successfully");
    });
}