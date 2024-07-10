import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LogActivityService } from './log-activity.service';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  LogActivity,
  LogActivityFindOneSuccessResponseDto,
  LogActivitySuccessResponseDto,
} from './dto/response';
import { errorResponse, sucessResponse } from 'src/lib/response';

@ApiTags('Log Activity')
@Controller('admin-internal/log-activity')
export class LogActivityController {
  constructor(private readonly logActivityService: LogActivityService) {}

  @Get()
  @ApiOkResponse({ type: LogActivitySuccessResponseDto })
  @ApiQuery({ name: 'page', type: 'string', required: false })
  @ApiQuery({ name: 'per_page', type: 'string', required: false })
  async findAll(
    @Query('page') page: string,
    @Query('per_page') per_page: string,
  ) {
    const pageNum = Number(page) || 1;
    const perPageNum = Number(per_page) || 10;

    try {
      const result = await this.logActivityService.findAll({
        page: pageNum,
        perPage: perPageNum,
      });
      return sucessResponse<LogActivity>(result);
    } catch (error) {
      errorResponse({ errors: error });
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: LogActivityFindOneSuccessResponseDto })
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.logActivityService.findOne(id);
      return sucessResponse<LogActivity>({
        data: result,
      });
    } catch (error) {
      console.log({ error });

      errorResponse({ errors: error });
    }
  }
}
