import mongoose from "mongoose";


const LockerStatusSchema = new mongoose.Schema({
    status: String,
    userid: String,
    rfid: String
});

const LockerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lockerName: String,
    lockerCampusLoc: String,
    lockerRoomLoc: String,
    lockerStatus: {
        1: {
            status: String,
            userid: String,
            rfid: String
        },
        2: {
            status: String,
            userid: String,
            rfid: String
        },
        3: {
            status: String,
            userid: String,
            rfid: String
        },
        4: {
            status: String,
            userid: String,
            rfid: String
        },
        5: {
            status: String,
            userid: String,
            rfid: String
        },
        6: {
            status: String,
            userid: String,
            rfid: String
        },
        7: {
            status: String,
            userid: String,
            rfid: String
        },
        8: {
            status: String,
            userid: String,
            rfid: String
        }
    }
});

const lockerModel = mongoose.model("Locker", LockerSchema);
export default lockerModel;
