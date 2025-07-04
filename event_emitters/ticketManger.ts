/**
 * Event Emitters in nodejs Advance topic
 * Helps to understand event driven archietucture
 * Event driven designed as pub sub pattern
 */

import {EventEmitter} from 'events';

/**
    const ticketManger = new EventEmitter();
 *  this is one way to create the event but we can improve this by making class and extending to EventEmitter

    advantaages to use Class based is: Encapsulation, OOP and Resuability.
    the disadvantages of using normal way is: Simplicity, Style and Gnerics Events. 
 */

export class TicketManger extends EventEmitter {
    private supply: number;
    constructor(supply: number){
        super();
        this.supply = supply
    }


    buy(email: string, price: number){
        if(this.supply > 0){
            this.supply = this.supply - 1
            this.emit("buy", email, price, Date.now());
            return;
        }

        this.emit("error", new Error("There are no more tickets left to purchase."))
    }
}