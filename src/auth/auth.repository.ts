import { EntityRepository, Repository } from "typeorm";
import { Userentity } from './../user/user.entity';

@EntityRepository(Userentity)
export class AuthReposity extends Repository<Userentity> {}