import { IEmail } from "../email";
import { ISentto } from "../sentto";

export class EmailDto implements IEmail{
    _id?: string;
    user_id: number;
    total_quota: number;
    total_mail_sent?: number;
    total_attachment_size?: number;
    sent_to?: [];
    created_date: Date;
    is_deleted: Boolean;


    constructor(dbObject:any){
        this._id = dbObject._id;
        this.user_id = dbObject.user_id;
        this.total_quota = dbObject.total_quota;
        this.total_mail_sent = dbObject.total_email_sent;
        this.total_attachment_size = dbObject.total_attachment_size;
        this.created_date = dbObject.createdBy;
        this.is_deleted = dbObject.isDeleted;
    }

       /**
     * 
     * @param dbObjects - array of db Objects
     */
       public static parseArray(dbObjects: any[]): EmailDto[] {
        return dbObjects.map((value, index, array) => {
            return new EmailDto(value);
        });
    }
}