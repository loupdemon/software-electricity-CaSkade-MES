import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SkillModule } from '../../skills/skill.module';
// import { ModuleModule } from '../../../routes/production-modules/module.module';
import { PlcMappingController } from './plc-mapping.controller';
import { PlcMappingService } from './plc-mapping.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
    HttpModule,
    SkillModule,
    MulterModule.register(
        {
        dest: './../uploaded-files/plcopen-xml',
        }
    )],
    controllers: [PlcMappingController],
    providers: [PlcMappingService]
    })
export class PlcMappingModule {}
