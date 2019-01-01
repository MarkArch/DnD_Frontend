export class userlogin {
    private userName: string;
    private password: string;
    private email:string;

    constructor(username: string, password: string,email:string) {
        this.userName = username;
        this.password = password;
        this.email=email;
    }
}