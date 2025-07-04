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

ticketManger.on('error', () => {
    console.log("Gracefully handled error!");
})

ticketManger.buy('sahil@google.com', 3400);
ticketManger.buy('satvik@google.com', 3400);
ticketManger.buy('manish@google.com', 3400);
ticketManger.buy('avinash@google.com', 3400);
ticketManger.buy('sumit@google.com', 3400);

// gracefully removing the listener is the good way for production
ticketManger.removeAllListeners();