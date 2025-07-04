export class DatabaseService{
    save({email, price, timeStamp}:{email: string, price: number, timeStamp: string}){
        console.log(`Running query: INSERT INTO orders VALUES (email, price, timeStamp) VALUES (${email}, ${price}, ${timeStamp})`);
    }
}