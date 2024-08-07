import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Req,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  ChangePasswordEmployeeDto,
  CreateEmployeeDto,
  ImportEmployeeDto,
  UpdateEmployeeDto,
} from './dto/request';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  EmployeeSuccessFindOneResponseDto,
  EmployeeSuccessResponseDto,
  SuccessCreateEmployeeResponseDto,
} from './dto/response';
import {
  errorResponse,
  sucessResponse,
  sucessWriteResponse,
} from 'src/lib/response';
import { EmployeeEntity, EmployeeListEntity } from './entities/employee.entity';

@ApiTags('Employee')
@ApiBearerAuth('access-token-operator')
@Controller('operator/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOkResponse({ type: SuccessCreateEmployeeResponseDto })
  @ApiBody({ type: CreateEmployeeDto })
  async create(@Body() createEmployeeDto: CreateEmployeeDto, @Req() request) {
    try {
      const result = await this.employeeService.create({
        body: createEmployeeDto,
        user: request['user'],
      });
      return sucessWriteResponse<EmployeeEntity>({ data: result });
    } catch (error) {
      console.log({ error });

      errorResponse({ errors: error });
    }
  }

  @Get()
  @ApiOkResponse({ type: EmployeeSuccessResponseDto })
  @ApiQuery({ name: 'page', type: 'string', required: false })
  @ApiQuery({ name: 'per_page', type: 'string', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiQuery({ name: 'division_id', type: 'string', required: false })
  async findAll(
    @Query('page') page: string,
    @Query('per_page') per_page: string,
    @Query('search') search: string,
    @Query('division_id') division_id: string,
    @Req() request,
  ) {
    try {
      const user = request['user'];
      const pageNum = Number(page) || 1;
      const perPageNum = Number(per_page) || 10;
      const result = await this.employeeService.findAll(
        {
          page: pageNum,
          perPage: perPageNum,
          division_id,
          search,
        },
        user,
      );
      return sucessResponse<EmployeeListEntity>(result);
    } catch (error) {
      console.log({ error });

      errorResponse({ errors: error });
    }
  }

  @Get(':employee_id')
  @ApiOkResponse({ type: EmployeeSuccessFindOneResponseDto })
  async findOne(@Param('employee_id') id: string) {
    try {
      const result = await this.employeeService.findOne({ id });
      return sucessResponse<EmployeeEntity>({ data: result });
    } catch (error) {
      console.log({ error });
      errorResponse({ errors: error });
    }
  }

  @Put(':employee_id')
  @ApiOkResponse({ type: SuccessCreateEmployeeResponseDto })
  @ApiBody({ type: UpdateEmployeeDto })
  async update(
    @Param('employee_id') id: string,
    @Body() body: UpdateEmployeeDto,
    @Req() request,
  ) {
    const user = request['user'];
    try {
      const result = await this.employeeService.update({ id, body, user });
      return sucessWriteResponse<EmployeeEntity>({ data: result });
    } catch (error) {
      console.log({ error });
      errorResponse({ errors: error });
    }
  }

  @Patch(':employee_id/change-password')
  @ApiBody({ type: ChangePasswordEmployeeDto })
  async changePassword(
    @Param('employee_id') id: string,
    @Body() data: ChangePasswordEmployeeDto,
    @Req() request,
  ) {
    const user = request['user'];
    try {
      const result = await this.employeeService.changePassword({
        employee_id: id,
        data,
        user,
      });
      return sucessWriteResponse({ data: result });
    } catch (error) {
      console.log({ error });
      errorResponse({ errors: error });
    }
  }

  @Delete(':employee_id')
  async remove(@Param('employee_id') id: string, @Req() request) {
    const user = request['user'];
    try {
      const result = await this.employeeService.remove({ id, user });
      return sucessWriteResponse({ data: result });
    } catch (error) {
      console.log({ error });
      errorResponse({ errors: error });
    }
  }

  @Post('import')
  @ApiBody({ type: ImportEmployeeDto })
  async import() {
    return '';
    //   try {
    //     const result = await this.employeeService.import();

    //     return result;
    //   } catch (error) {
    //     console.log({ error });
    //     errorResponse({ errors: error });
    //   }
  }
}
