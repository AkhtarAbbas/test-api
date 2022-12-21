import { LoggerService } from 'src/logger/logger.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private readonly logger;
    constructor(logger?: LoggerService);
    handleCron(): void;
    handleInterval(): void;
    handleTimeout(): void;
    create(createTaskDto: CreateTaskDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTaskDto: UpdateTaskDto): string;
    remove(id: number): string;
}
