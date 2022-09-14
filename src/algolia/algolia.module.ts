import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlgoliaController } from './algolia.controller';
import { AlgoliaService } from './algolia.service';

@Module({
  controllers: [AlgoliaController],
  providers: [AlgoliaService, PrismaService],
})
export class AlgoliaModule {}
