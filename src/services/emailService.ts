import { Schema, model } from 'mongoose';
import { IEmail } from '../models/email';

export class EmailService {
    private emailschema = new Schema<IEmail>({
        user_id: { type: Number, required: true },
        total_quota: { type: Number, required: true },
        total_mail_sent: { type: Number },
        total_attachment_size: { type: Number },
        sent_to: [],
        created_date: { type: Date },
        is_deleted: { type: Boolean, default: false }

    }, { shardKey: { accountId: 1 } });

    private emailModel = model<IEmail>('Email', this.emailschema);

    constructor() {
    }

    async createEmail(email: IEmail): Promise<IEmail> {
        return new Promise(async (resolve, reject) => {
            let res = await this.getEmailbyId(email.user_id);
            
            if (res) {
                email.sent_to.map((val) => {
                    this.emailModel.findOneAndUpdate({ "sent_to.email": val }, { $inc: { "sent_to.$.count": 1, "total_mail_sent": 1, "total_attachment_size": email.total_attachment_size} }).exec().then((result) => {
                        if (!result) {
                            this.emailModel.findOneAndUpdate({ "user_id": res.user_id }, { $push: { "sent_to": {email:val,count:1} } }).exec();
                            this.emailModel.findOneAndUpdate({ "user_id": res.user_id}, { $inc: { "total_mail_sent": 1, "total_attachment_size": email.total_attachment_size}}).exec();
                        }
                    }).catch((error) => {
                     reject(error);
                    });
                });
                let afterUpdateres = await this.getEmailbyId(email.user_id);
                resolve(afterUpdateres);
            } 
        });
    }


    async getAllEmail(): Promise<IEmail[]> {
        return await this.emailModel
            .find({ is_deleted: false })
            .exec();
    }

    async getEmailbyId(user_id: number): Promise<IEmail> {
        return await this.emailModel
            .findOne({ user_id, is_deleted: false })
            .exec();
    }

    async insertQuota(obj): Promise<IEmail>{
        //return await this.emailModel.findOneAndUpdate({ "user_id": obj.user_id }, {"total_quota":obj.total_quota}).exec();
        let model = new this.emailModel(obj);
        return await model.save();
    }

    async delete(user_id): Promise<IEmail>{
        return await this.emailModel.findOneAndUpdate({ "user_id": user_id }, {"is_deleted":true}).exec();
    }
}

export default new EmailService();