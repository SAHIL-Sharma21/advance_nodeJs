import {TicketManger} from './ticketManger'
import {EmailService} from './emailService'
import {DatabaseService} from './databaseService'

const ticketManger  = new TicketManger(4);
const emailService = new EmailService();
const databaseService = new DatabaseService();


ticketManger.on('buy', (email, price, timeStamp) => {
    emailService.send(email);
    databaseService.save({email, price, timeStamp});  
});

ticketManger.buy('sahil@google.com', 3400);
