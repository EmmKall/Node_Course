
import { Request, Response } from "express";
import { TodoOrmImp, todoORMI } from "../../data/orm/Todo.orm.imp";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";

const data = [
    { id: 1, name: 'Batman', created: new Date() },
    { id: 2, name: 'Superman', created: new Date() },
    { id: 3, name: 'Flash', created: new Date() }
];

export class TodoController {
  private todoOrmImp: TodoOrmImp;

  constructor() {
    this.todoOrmImp = new TodoOrmImp();
  }

  public getTest = (req: Request, res: Response) => {
    res.json({ error: false, data: { message: "Hello World" } });
  };

  public getData = async (req: Request, res: Response) => {
    const todos = await this.todoOrmImp.getTodos();
    res.json({ error: false, todos });
  };

  public getById = async (req: Request, res: Response) => {
    if (isNaN(parseInt(req.params.id as string))) {
      return res
        .status(400)
        .json({ error: true, message: "Id must be a number" });
    }
    const id = parseInt(req.params.id as string);

    const todo = await this.todoOrmImp.getTodoById(id);
    if (!todo) {
      return res.status(404).json({ error: true, message: "Todo not found" });
    }
    res.json({ error: false, data: todo });
  };

  public create = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error !== "")
      return res.status(400).json({ error: true, message: error });

    const todo = await this.todoOrmImp.createTodo(createTodoDto!.toDB() as todoORMI);
    res.json({ error: false, data: todo });
  };

  public update = async (req: Request, res: Response) => {
    const [error, id, updateTodoDto] = UpdateTodoDto.create({
      id: req.params.id,
      ...req.body,
    });
    if (error !== "")
      return res.status(400).json({ error: true, message: error });
    const todo = await this.todoOrmImp.updateTodo({
      id,
      todo: updateTodoDto.toDB() as todoORMI,
    });
    if (!todo) {
      return res.status(404).json({ error: true, message: "Todo not found" });
    }
    res.json({ error: false, data: todo });
  };

  public complete = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const todo = await this.todoOrmImp.completeTodo(id);
    res.json({ error: false, data: todo });
  };

  public delete = async (req: Request, res: Response) => {
    if (isNaN(parseInt(req.params.id as string))) {
      return res
        .status(400)
        .json({ error: true, message: "Id must be a number" });
    }
    const id = parseInt(req.params.id as string);

    const todo = await this.todoOrmImp.destroyTodo(id);
    if (!todo) {
      return res.status(404).json({ error: true, message: "Todo not found" });
    }
    res.json({ error: false, data: todo });
  };
}