export default abstract class IConfigService {
  abstract get(key: string, defaultValue?: string): string;

  abstract getOptional(key: string): string | undefined;

  abstract getNumberOptional(key: string): number | undefined;

  abstract getNumber(key: string, defaultValue?: number): number;

  abstract getBoolean(key: string, defaultValue?: boolean): boolean;

  abstract getBooleanOptional(key: string): boolean | undefined;
}
