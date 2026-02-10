import { v4 as uuidv4 } from 'uuid';

export class UuidAdapter {

    static randomUUID() {
        return uuidv4();
    }

}