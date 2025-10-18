import colors from 'yoctocolors';

enum StatusType {
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
}

class Logger {
    public source: string; // ie, [Client INFO] message

    constructor(source: string) {
        this.source = source;
    }

    private format(message: string, type: StatusType) {
        return `[${this.source} ${type}] ${message}`;
    }

    info(message: string) {
        console.log(colors.blue(this.format(message, StatusType.INFO)));
    }

    warning(message: string) {
        console.log(colors.yellow(this.format(message, StatusType.WARNING)));
    }

    error(message: string) {
        console.log(colors.red(this.format(message, StatusType.ERROR)));
    }
}

export default Logger;