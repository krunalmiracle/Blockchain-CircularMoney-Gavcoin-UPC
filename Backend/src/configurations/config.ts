//Configuration File for Localhost server of GoData
interface IConfig {
    URL : string,
    IV_LENGTH : number,
    saltRounds : number,
    USER :string,
    PASSWORD : string,
    DB: {
        URI: string,
        USER: string,
        PASSWORD: string
    },
}
const config:IConfig = {
    URL             :   "http://localhost:8000/api", //Go Data URI
    IV_LENGTH       :   16, // Minimum Length 16 IV
    saltRounds      :   10, // Hash Function Rounds, recommended for security at least 10
    USER            :   "genesis@gavkoin.com",
    PASSWORD        :   "kruskechi1234",
    DB              :   {
        URI     : process.env.MONGODB_URI || 'mongodb://localhost:27017/gavkoin',
        USER    : process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    },
};
module.exports = config;
