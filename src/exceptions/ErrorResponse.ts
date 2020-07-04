/**
 * Extend Response to avoid try/catch everywhere.
 */
export default class ErrorResponse extends Response {
    private readonly message: string;

    private constructor(message: string) {
        super(null);
        this.message = message;
    }

    /**
     * @param {Error} error Exception to generate an ErrorResponse from
     */
    public static fromError(error: Error) {
        return new ErrorResponse(error.message);
    }

    /**
     * Response does not allow a status code of 0 (out of range)
     * @override
     */
    get status(): number {
        return 0;
    }

    /**
     * No way to set statusText directly in Response
     * @override
     */
    get statusText(): string {
        return this.message;
    }
}