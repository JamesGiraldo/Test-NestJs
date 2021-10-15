import { EntityRepository, Repository } from "typeorm";
import { Userentity } from './user.entity';

@EntityRepository(Userentity)
export class UserReposity extends Repository<Userentity> {}