import File from '../../entities/File';
import IFileStore from './IFileStore';
import { Connection, Repository } from 'typeorm';
export default class FileStore implements IFileStore {
    private connection;
    private readonly fileStore;
    constructor(connection: Connection, fileStore: Repository<File>);
    addFile(name: string, mimeType: string, mediaLink: string): Promise<File>;
    getFile(file: {
        id: string;
    }): Promise<File | undefined>;
}
