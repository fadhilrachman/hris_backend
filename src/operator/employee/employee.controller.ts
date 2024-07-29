import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ChangePasswordEmployeeDto, CreateEmployeeDto } from './dto/request';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  EmployeeSuccessFindOneResponseDto,
  EmployeeSuccessResponseDto,
} from './dto/response';

@ApiTags('Employee')
@Controller('operator/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // @Post()
  // // @ApiOkResponse({type:})
  // @ApiBody({ type: CreateEmployeeDto })
  // create(@Body() createEmployeeDto: CreateEmployeeDto) {
  //   return this.employeeService.create(createEmployeeDto);
  // }

  // @Get()
  // @ApiOkResponse({ type: EmployeeSuccessResponseDto })
  // findAll() {
  //   return this.employeeService.findAll();
  // }

  @Get(':employee_id')
  @ApiOkResponse({ type: EmployeeSuccessFindOneResponseDto })
  findOne(@Param('employee_id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Put(':employee_id')
  @ApiBody({ type: CreateEmployeeDto })
  update(
    @Param('employee_id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Patch(':employee_id/change-password')
  @ApiBody({ type: ChangePasswordEmployeeDto })
  changePassword(
    @Param('employee_id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':employee_id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
