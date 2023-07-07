import { ISentto } from "./sentto";
export declare interface IEmail {
    _id?: string;
    user_id: number;
    total_quota: number;
    total_mail_sent?: number;
    total_attachment_size?: number;
    sent_to?: [],
    created_date: Date;
    is_deleted: Boolean;
}
