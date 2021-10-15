import { EntityRepository, Repository } from "typeorm";
import { Userentity } from './../user/user.entity';

@EntityRepository(Userentity)
export class RegisterReposity extends Repository<Userentity> {}