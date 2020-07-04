export default class ApiError extends Error {

    private constructor(error: Error) {
        super(error.message);
        this.name = 'ApiError';
        this.stack = error.stack;
    }

    public static fromMessage(message: string) {
        return new ApiError(new Error(message));
    }
}