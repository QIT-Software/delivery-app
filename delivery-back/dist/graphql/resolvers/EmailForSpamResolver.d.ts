import EmailForSpamRequest from 'graphql/entities/emailForSpam/CreateEmailForSpamRequest';
import IEmailFroSpamManager from '../../managers/emailForSpamManager/IEmailFroSpam';
export declare class EmailForSpamResolver {
    private readonly emailFroSpamManager;
    constructor(emailFroSpamManager: IEmailFroSpamManager);
    createEmailForSpam(email: EmailForSpamRequest): Promise<boolean>;
    getEmailsForSpam(): Promise<import("../../entities/EmailForSpam").default[]>;
}
