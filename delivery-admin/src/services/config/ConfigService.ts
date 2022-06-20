import IConfigService from 'services/config/IConfigService';
import resources from '../../resources/env.tmp.json';

type Dictionary = {[key: string]: string | undefined};

export default class ConfigService implements IConfigService {
  private readonly config: Dictionary;

  constructor(env: string) {
    this.config = ConfigService.readConfig(
      `.env`,
      `.env.local`,
      `.env.${env}`,
      `.env.${env}.local`,
    );
  }

  get(key: string, defaultValue?: string): string {
    return ConfigService.requireValue(key, this.getOptional(key), defaultValue);
  }

  getOptional(key: string): string | undefined {
    return this.config[key];
  }

  getNumber(key: string, defaultValue?: number): number {
    return ConfigService.requireValue(key, this.getNumberOptional(key), defaultValue);
  }

  getNumberOptional(key: string): number | undefined {
    const valueS = this.getOptional(key);
    if (!valueS) return undefined;
    const value = Number(valueS);
    if (Number.isNaN(value))
      throw new Error(ConfigService.formatEnvError(key, 'is not a number'));
    return value;
  }

  getBoolean(key: string, defaultValue?: boolean): boolean {
    return ConfigService.requireValue(key, this.getBooleanOptional(key), defaultValue);
  }

  getBooleanOptional(key: string): boolean | undefined {
    const valueS = this.getOptional(key);
    if (!valueS) return undefined;
    switch (valueS) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        throw new Error(ConfigService.formatEnvError(key, 'is not a boolean'));
    }
  }

  private static readConfig(...files: string[]): Dictionary {
    let config: Dictionary = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      config = {
        ...config,
        ...ConfigService.readConfigFile(file),
      };
    }
    return config;
  }

  private static readConfigFile(file: string): Dictionary {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const config: Dictionary | undefined = (resources as any)[file];
      if (!config) return {};
      return config;
    } catch (e) {
      return {};
    }
  }

  private static formatEnvError(key: string, errorMessage: string) {
    return `env ${key} ${errorMessage}`;
  }

  private static requireValue<TValue>(
    key: string,
    value: TValue | undefined,
    defaultValue: TValue | undefined,
  ): TValue {
    if (!value) {
      if (defaultValue) return defaultValue;
      throw new Error(ConfigService.formatEnvError(key, 'not found'));
    }
    return value;
  }
}
