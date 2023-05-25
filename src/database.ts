import mongoose from 'mongoose';

const dbConfig = {
    url: 'mongodb://localhost:27017/todo'
};

export const connectDatabase = () => {
    mongoose.connect(dbConfig.url)
    const dataBase = mongoose.connection;
    dataBase.on("error", console.error.bind(console, "connection error: "));
    dataBase.once("open", function () {
        console.log("Database Connected successfully");
    });
}