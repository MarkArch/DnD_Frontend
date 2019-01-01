export class sessionEnum {
    session_name: string;
    session_master: string;
    session_id: number;

    constructor(session_id, session_master, session_name) {
        this.session_id = session_id;
        this.session_master = session_master;
        this.session_name = session_name;
    }
}