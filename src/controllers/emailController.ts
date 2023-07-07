import { RequestHandler } from "express";
import EmailService from "../services/emailService";
import { error } from "console";

// saveEmailDetails
export const saveEmailDetails: RequestHandler = async (req, res) => {
    await EmailService.createEmail(req.body).then(async(result) => {
        
        const response = await EmailService.getEmailbyId(req.body.user_id);
        res.status(200).json(response);
    }).catch((error) => {
        res.status(500).json(error);
    });
}

// update quota
export const updateQuota: RequestHandler = async (req, res) => {
    const emailObj = req.body;
    const result = await EmailService.insertQuota(emailObj);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(500).json(error);
    }
}

//get user details
export const findUser: RequestHandler = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const response = await EmailService.getEmailbyId(userId);

    if (response) {
        const userObject = {
            "user_id": response.user_id,
            "total_quota": response.total_quota,
            "total_mail_sent": response.total_mail_sent,
            "sent_to":response.sent_to,
            "total_attachment_size": response.total_attachment_size
    };
        res.status(200).json(userObject);
    } else {
        res.status(404).json("User not found!");
    }
}

//soft delete user
export const deleteSender: RequestHandler = async(req, res) => {

    const userId = parseInt(req.params.userId);
    const response = await EmailService.getEmailbyId(userId);
    if(response){

        const resp = await EmailService.delete(userId);
        if (resp) {
            res.status(200).send({message: "Deleted successfully"});
        } else {
            res.status(500).send({message: "Internal error occured"});
        }

    }else{
        res.status(404).send({message: "User not found!"});
    }
}
