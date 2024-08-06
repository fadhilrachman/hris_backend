import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Query,
  HttpException,
  Put,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/request';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DatabaseService } from 'src/database/database.service';
import { ValidationPipeCustom } from '../../pipes/validation.pipe';
import {
  SucessResponseType,
  errorResponse,
  sucessResponse,
} from '../../lib/response';
import {
  Admin,
  AdminErrorDuplicateDto,
  AdminSuccessResponseDto,
  SuccessCreateAdminResponseDto,
} from './dto/response';
import { MessageError, NotFoundError } from 'src/lib/shared-dto';
import { Request } from 'express';

interface User {
  id: number;
  name: string;
}

@ApiTags('Admin')
@ApiBearerAuth('access-token')
@UsePipes(ValidationPipeCustom)
@Controller('admin-internal/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiBody({ type: CreateAdminDto })
  @ApiOkResponse({ type: SuccessCreateAdminResponseDto })
  @ApiBadRequestResponse({
    type: AdminErrorDuplicateDto,
    description: 'Error duplicate user',
  })
  async create(
    @Body() createAdminDto: CreateAdminDto,
    @Req() request,
  ): Promise<SucessResponseType<Admin>> {
    try {
      createAdminDto.ip = request.ip;
      createAdminDto.user_id = request.user.id;
      const result = await this.adminService.create(createAdminDto);

      return sucessResponse({ data: result });
      // return;
    } catch (error) {
      errorResponse({ errors: error });
    }
  }

  @Get()
  @ApiOkResponse({ type: AdminSuccessResponseDto })
  @ApiQuery({ name: 'page', type: 'string', required: false })
  @ApiQuery({ name: 'per_page', type: 'string', required: false })
  // @ApiQuery({ name: 'search', type: 'string', required: false })
  async findAll(
    @Query('page') page: string,
    @Query('per_page') per_page: string,
    // @Query('search') search: string,
  ) {
    const pageNum = Number(page) || 1;
    const perPageNum = Number(per_page) || 10;
    try {
      const result = await this.adminService.findAll({
        page: pageNum,
        perPage: perPageNum,
      });
      return sucessResponse<Admin>(result);
    } catch (error) {}
  }
  @Get(':user_id')
  @ApiOkResponse({
    type: SuccessCreateAdminResponseDto,
  })
  @ApiNotFoundResponse({ type: NotFoundError })
  async findOne(
    @Param('user_id') user_id: string,
  ): Promise<SucessResponseType<Admin>> {
    try {
      const result = await this.adminService.findOne(user_id);
      return sucessResponse({ data: result });
    } catch (error) {
      errorResponse({ errors: error });
    }
  }

  // @Put(':id')
  // @ApiBody({ type: CreateAdminDto })
  // @ApiOkResponse({ type: SuccessCreateAdminResponseDto })
  // @ApiBadRequestResponse({
  //   type: AdminErrorDuplicateDto,
  //   description: 'Error duplicate user',
  // })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAdminDto: CreateAdminDto,
  // ): Promise<SucessResponseType<Admin>> {
  //   try {

  //   } catch (error) {
  //   }
  //   // return this.adminService.update(+id, updateAdminDto);
  // }

  @Delete(':user_id')
  @ApiOkResponse({ type: SuccessCreateAdminResponseDto })
  @ApiNotFoundResponse({ type: NotFoundError })
  async remove(
    @Param('user_id') user_id: string,
    @Req() request,
  ): Promise<SucessResponseType<Admin>> {
    try {
      const data = {
        user_id: request.user.id,
        ip: request.ip,
      };
      console.log({ data });

      const result = await this.adminService.remove(user_id, data);
      return sucessResponse({ data: result });
    } catch (error) {
      console.log({ error });

      errorResponse({ errors: error });
    }
  }
}
