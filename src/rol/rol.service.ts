import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RolEntity } from './rol.entity';
import { RolRepository } from './rol.repository';
import { RolDto } from './dto/rol.dto';

import { HTTP_MESSAGE } from './../config/constants';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private rolRepository: RolRepository,
    ) {}

    async getAll(): Promise<RolEntity[]> {
        const roles = await this.rolRepository.find();
        if (!roles.length) throw new NotFoundException( HTTP_MESSAGE.NO_DATA );
        return  roles;
    }

    async getById(id: number): Promise<RolEntity> {
        const rol = await this.rolRepository.findOne(id);
        if (!rol) throw new NotFoundException( HTTP_MESSAGE.ID_NOT_FOUND );
        return rol;
    }

    async create(rol: RolDto): Promise<any> {
        const exists = await this.rolRepository.findOne({where: {roleName: rol.roleName}});
        if(exists) throw new NotFoundException( HTTP_MESSAGE.EXISTS );
        const newRol = await this.rolRepository.create(rol as RolEntity);
        await this.rolRepository.save(newRol);
        return HTTP_MESSAGE.CREATED;
    }
}
