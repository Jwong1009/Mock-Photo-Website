class UserError extends Error {
    constructor(message, status) {
        super(message);
        this.message = message;
        // this.redirectURL = redirectURL;
        this.status = status;
    }

    getMessage() {
        return this.message;
    }

    // getRedirectURL() {
    //     return this.redirectURL;
    // }

    getStatus() {
        return this.status;
    }
}

module.exports = UserError;