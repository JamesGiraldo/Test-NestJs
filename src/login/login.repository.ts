import { EntityRepository, Repository } from "typeorm";
import { Userentity } from './../user/user.entity';

@EntityRepository(Userentity)
export class LoginReposity extends Repository<Userentity> {}