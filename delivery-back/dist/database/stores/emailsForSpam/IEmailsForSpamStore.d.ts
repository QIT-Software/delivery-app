import { ID } from 'entities/Common';
import EmailsForSpam from 'database/entities/EmailsForSpam';
export default abstract class IEmailsForSpamStore {
    abstract createEmailForSpam(email: Partial<EmailsForSpam>): Promise<EmailsForSpam>;
    abstract getEmailForSpam(id: ID): Promise<EmailsForSpam | undefined>;
    abstract getEmailOrFail(id: ID): Promise<EmailsForSpam>;
}
