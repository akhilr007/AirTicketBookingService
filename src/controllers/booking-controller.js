const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services/index");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController {

    constructor(){
        
    }

    async sendMessageToQueue(req, res) {

        const channel = await createChannel();

        const payload = {
            data: {
                subject: "This is notification from queue",
                content: "Msg will be sent by message queue",
                recepientEmail: "akhilrd007@gmail.com",
                notificationTime: "2023-01-14T17:30:26"
            },
            service: "CREATE_TICKET"
        };
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));

        return res.status(200).json({
            success: true,
            err: {},
            message: "successfully published the event"
        })
    }

    async create (req, res) {

        try {
            const response = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                data: response,
                message: "successfully completed booking",
                success: true,
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                data: {},
                message: error.message,
                success: false,
                err: error.explanation
            })
        }

    }
}


module.exports = BookingController;