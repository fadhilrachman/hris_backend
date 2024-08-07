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
  NotFoundException,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCompanuDto } from './dto/request';
import {
  Company,
  CompanyDetail,
  CompanySuccessFindOneResponseDto,
  CompanySuccessResponseDto,
} from './dto/response';
import { errorHandler, errorResponse, sucessResponse } from 'src/lib/response';
import { CreateAdminDto } from '../admin/dto/request';

@ApiTags('Company')
@ApiBearerAuth('access-token')
@Controller('admin-internal/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiBody({ type: CreateCompanuDto })
  async create(@Body() createCompanyDto: CreateCompanuDto) {
    try {
      const result = await this.companyService.create(createCompanyDto);
      return sucessResponse({ data: result });
    } catch (error) {
      console.log({ error });

      errorResponse({ errors: error });
    }
  }
  @Post('create-operator/:company_id')
  @ApiBody({ type: CreateAdminDto })
  async createOperator(
    @Body() createCompanyDto: CreateAdminDto,
    @Param('company_id') company_id: string,
  ) {
    try {
      const result = await this.companyService.createOperator(
        createCompanyDto,
        company_id,
      );
      return sucessResponse({ data: result });
    } catch (error) {
      console.log({ error });

      errorResponse({ errors: error });
    }
  }

  @Get()
  @ApiOkResponse({ type: CompanySuccessResponseDto })
  @ApiQuery({ name: 'page', type: 'string', required: false })
  @ApiQuery({ name: 'per_page', type: 'string', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  async findAll(
    @Query('page') page: string,
    @Query('per_page') per_page: string,
    @Query('search') search: string,
  ) {
    const pageNum = Number(page) || 1;
    const perPageNum = Number(per_page) || 10;
    try {
      const result = await this.companyService.findAll({
        page: pageNum,
        perPage: perPageNum,
        search,
      });
      return sucessResponse<Company>(result);
    } catch (error) {
      console.log({ error });
      errorResponse({ errors: error });
    }
  }

  @Get(':company_id')
  @ApiOkResponse({ type: CompanySuccessFindOneResponseDto })
  async findOne(@Param('company_id') company_id: string) {
    try {
      const result = await this.companyService.findOne(company_id);
      if (!result)
        throw new NotFoundException(
          errorHandler({ errors: [{ data: ['Data not found'] }] }),
        );
      return sucessResponse<CompanyDetail>({
        data: result,
      });
    } catch (error) {
      console.log({ error });
      errorResponse({ errors: error });
    }
  }

  @Put(':company_id')
  @ApiBody({ type: CreateCompanuDto })
  async update(
    @Param('company_id') company_id: string,
    @Body() updateCompanyDto: CreateCompanuDto,
  ) {
    try {
      const result = await this.companyService.update(
        company_id,
        updateCompanyDto,
      );
      return sucessResponse({ data: result });
    } catch (error) {
      console.log({ error });

      errorResponse({ errors: error });
    }
  }

  @Delete(':company_id')
  async remove(
    @Param('company_id') company_id: string,
    @Body() data: { user_id: string; ip: string },
  ) {
    try {
      const result = await this.companyService.remove(company_id, data);
      return sucessResponse({ data: result });
    } catch (error) {
      console.log({ error });

      errorResponse({ errors: error });
    }
  }
}
