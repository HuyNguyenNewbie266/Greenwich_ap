import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Term } from '../entities/term.entity';

class TermListMetaDto {
  @ApiProperty({ description: 'Total number of terms matching the query.' })
  total!: number;

  @ApiProperty({ description: 'Current page number (1-indexed).' })
  page!: number;

  @ApiProperty({ description: 'Maximum number of records returned per page.' })
  limit!: number;

  @ApiProperty({
    description: 'Total number of pages available for the query.',
  })
  pageCount!: number;
}

export class TermListResponseDto {
  @ApiProperty({ type: () => [Term] })
  @Type(() => Term)
  data!: Term[];

  @ApiProperty({ type: () => TermListMetaDto })
  @Type(() => TermListMetaDto)
  meta!: TermListMetaDto;
}
