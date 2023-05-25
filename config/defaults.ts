export default {
    port: 8080,
    accessTokenExpiresIn: 600, //10 mins
    jwtTokenName: "jwt_token",
    databaseConnectionString: `mongodb+srv://todo-user:${process.env.dbSecret}@cluster0.2uzb9iw.mongodb.net/?retryWrites=true&w=majority`
};
