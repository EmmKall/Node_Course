import { CreateTodoDto } from "./create-todo.dto";

export class UpdateTodoDto {
    
    constructor(public readonly name: string, public readonly description?: string) {
    }

    public static create(props: {[key: string]: any}): [string, number, UpdateTodoDto] {
        const { name, description } = props;
        const id = parseInt(props.id);
        if(isNaN(id)) return ['Id must be a number', id, {} as UpdateTodoDto];
        if (!name) return ["Name is required", id, {} as UpdateTodoDto];
        if (!description) return ["Description is required", id, {} as UpdateTodoDto];
        return ['', id, new UpdateTodoDto(name, description)];
    }

    public toDB() {
        return {
            name: this.name,
            description: this.description,
        };
    }

}