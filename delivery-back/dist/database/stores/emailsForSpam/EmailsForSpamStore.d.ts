import { Repository } from 'typeorm';
import IEmailsForSpamStore from 'database/stores/emailsForSpam/IEmailsForSpamStore';
import { ID } from 'entities/Common';
import EmailsForSpam from 'database/entities/EmailsForSpam';
export default class EmailsForSpamStore implements IEmailsForSpamStore {
    private readonly repository;
    constructor(repository: Repository<EmailsForSpam>);
    getEmailForSpam(id: ID): Promise<EmailsForSpam>;
    getEmailOrFail(id: ID): Promise<EmailsForSpam>;
    createEmailForSpam(email: Partial<EmailsForSpam>): Promise<EmailsForSpam>;
}
