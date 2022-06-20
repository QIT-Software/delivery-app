import IConfigService from 'services/config/IConfigService';
export default class ConfigService implements IConfigService {
    private readonly config;
    constructor(root: string, env: string);
    get(key: string, defaultValue?: string): string;
    getOptional(key: string): string | undefined;
    getNumber(key: string, defaultValue?: number): number;
    getNumberOptional(key: string): number | undefined;
    getBoolean(key: string, defaultValue?: boolean): boolean;
    getBooleanOptional(key: string): boolean | undefined;
    private static readConfig;
    private static readConfigFile;
    private static formatEnvError;
    private static requireValue;
}
