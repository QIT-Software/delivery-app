import IEmailForSpamManager from 'managers/emailForSpamManager/IEmailFroSpam';
import CreateEmailForSpamRequest from 'graphql/entities/emailForSpam/CreateEmailForSpamRequest';
import IEmailForSpamStoreStore from 'database/stores/emailForSpam/IEmailForSpamStore';
import EmailsForSpam from 'entities/EmailForSpam';
export default class EmailForSpam implements IEmailForSpamManager {
    private emailForSpamStore;
    constructor(emailForSpamStore: IEmailForSpamStoreStore);
    createEmailForSpam(email: CreateEmailForSpamRequest): Promise<void>;
    getEmailsForSpam(): Promise<EmailsForSpam[]>;
}
