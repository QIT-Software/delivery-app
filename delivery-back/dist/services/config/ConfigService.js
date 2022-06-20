"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const IConfigService_1 = __importDefault(require("./IConfigService"));
const common_1 = require("@nestjs/common");
class ConfigService {
    constructor(root, env) {
        this.config = ConfigService.readConfig(`${root}.env`, `${root}.env.local`, `${root}.env.${env}`, `${root}.env.${env}.local`);
    }
    get(key, defaultValue) {
        return ConfigService.requireValue(key, this.getOptional(key), defaultValue);
    }
    getOptional(key) {
        return this.config[key];
    }
    getNumber(key, defaultValue) {
        return ConfigService.requireValue(key, this.getNumberOptional(key), defaultValue);
    }
    getNumberOptional(key) {
        const valueS = this.getOptional(key);
        if (!valueS)
            return undefined;
        const value = Number(valueS);
        if (Number.isNaN(value))
            throw new Error(ConfigService.formatEnvError(key, 'is not a number'));
        return value;
    }
    getBoolean(key, defaultValue) {
        return ConfigService.requireValue(key, this.getBooleanOptional(key), defaultValue);
    }
    getBooleanOptional(key) {
        const valueS = this.getOptional(key);
        if (!valueS)
            return undefined;
        switch (valueS) {
            case 'true':
                return true;
            case 'false':
                return false;
            default:
                throw new Error(ConfigService.formatEnvError(key, 'is not a boolean'));
        }
    }
    static readConfig(...files) {
        let config = process.env;
        for (const file of files) {
            config = Object.assign(Object.assign({}, config), ConfigService.readConfigFile(file));
        }
        return config;
    }
    static readConfigFile(file) {
        try {
            if (!fs.existsSync(file))
                return {};
            return dotenv.parse(fs.readFileSync(file));
        }
        catch (e) {
            common_1.Logger.error(e);
            return {};
        }
    }
    static formatEnvError(key, errorMessage) {
        return `env ${key} ${errorMessage}`;
    }
    static requireValue(key, value, defaultValue) {
        if (value === undefined) {
            if (defaultValue !== undefined)
                return defaultValue;
            throw new Error(ConfigService.formatEnvError(key, 'not found'));
        }
        return value;
    }
}
exports.default = ConfigService;
//# sourceMappingURL=ConfigService.js.map