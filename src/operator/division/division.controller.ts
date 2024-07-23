import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { DivisionService } from './division.service';
import { UpdateDivisionDto } from './dto/update-division.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Division, DivisionSuccessResponseDto } from './dto/response';
import { CreateDivisionDto } from './dto/request';
import { errorResponse, sucessResponse } from 'src/lib/response';
import { HeadersOperator } from 'src/lib/shared-dto';

@ApiTags('Division')
@ApiBearerAuth('access-token-operator')
@Controller('operator/division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post()
  @ApiBody({ type: CreateDivisionDto })
  async create(
    @Body() createDivisionDto: CreateDivisionDto,
    @Req() request: Request,
  ) {
    const user: HeadersOperator = request['user'];

    try {
      const result = await this.divisionService.create({
        body: createDivisionDto,
        user,
      });
      return sucessResponse<Division>({ data: result });
    } catch (error) {
      console.log({ error });

      errorResponse({ errors: error });
    }
  }

  @Get()
  @ApiQuery({ name: 'per_page', type: 'string', required: false })
  @ApiQuery({ name: 'page', type: 'string', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiOkResponse({
    type: DivisionSuccessResponseDto,
  })
  async findAll(
    @Query('page') page: string,
    @Query('per_page') per_page: string,
    @Req() request: Request,
  ) {
    const user: HeadersOperator = request['user'];
    const pageNum = Number(page) || 1;
    const perPageNum = Number(per_page) || 10;

    try {
      const result = await this.divisionService.findAll(
        {
          page: pageNum,
          perPage: perPageNum,
        },
        user.company_id,
      );
      return sucessResponse<Division>(result);
    } catch (error) {
      console.log({ error });

      errorResponse({ errors: error });
    }
  }

  @Get(':company_id')
  async findOne(@Param('company_id') id: string, @Req() request: Request) {
    const user: HeadersOperator = request['user'];
    try {
      const result = await this.divisionService.findOne({ id, user });
      return sucessResponse<Division>({ data: result });
    } catch (error) {
      console.log({ error });

      errorResponse({ errors: error });
    }
  }

  @Put(':company_id')
  @ApiBody({ type: CreateDivisionDto })
  async update(
    @Param('company_id') id: string,
    @Body() createDivisionDto: CreateDivisionDto,
    @Req() request: Request,
  ) {
    const user: HeadersOperator = request['user'];

    try {
      const result = await this.divisionService.update({
        id,
        body: createDivisionDto,
        user,
      });
      return sucessResponse<Division>({
        data: result,
      });
    } catch (error) {
      console.log({ error });

      errorResponse({ errors: error });
    }
  }

  @Delete(':company_id')
  async remove(@Param('company_id') id: string, @Req() request: Request) {
    const user: HeadersOperator = request['user'];

    try {
      const result = await this.divisionService.remove({
        id,
        user,
      });
      return sucessResponse<Division>({
        data: result,
      });
    } catch (error) {
      console.log({ error });

      errorResponse({ errors: error });
    }
  }
}
