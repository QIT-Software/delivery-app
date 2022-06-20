import EmailsForSpam from 'database/entities/EmailsForSpam';
import { Repository } from 'typeorm';
import IEmailForSpamStore from 'database/stores/emailForSpam/IEmailForSpamStore';
export default class EmailForSpamStore extends IEmailForSpamStore {
    private readonly repository;
    constructor(repository: Repository<EmailsForSpam>);
    createEmailForSpam(email: {
        email: string;
        isDiscount: boolean;
    }): Promise<EmailsForSpam>;
    getEmails(): Promise<EmailsForSpam[]>;
}
