import { Controller, Body, Post } from "@nestjs/common";
import { SkillExecutorFactory } from "./skill-executor-factory.service";
import { SkillExecutionRequestDto } from "@shared/models/skill/SkillExecutionRequest";

@Controller('skill-executions')
export class SkillExecutionController{

    constructor(private executorFactory: SkillExecutorFactory) {}

    // TODO: Check that skill is in the right state to execute the requested command
    //      --> Send 400 if not
    // TODO: Currently, every skill is directly executed. There could be some kind of scheduler that allows
    //      to add skills for later execution. In this case, this method could be used for adding and a scheduler
    //      could be added to execute the skill
    @Post()
    async addNewSkillExecution(@Body() executionRequest: SkillExecutionRequestDto): Promise<string>{
        const skillExecutor = await this.executorFactory.getSkillExecutor(executionRequest.skillIri);
        skillExecutor.executeSkill(executionRequest);
        return "Execution successful. This should return SkillOutputs soon...";
    }

}
