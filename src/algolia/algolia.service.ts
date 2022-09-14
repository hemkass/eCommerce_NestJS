import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlgoliaService {
  constructor(private prisma: PrismaService) {}

  async indexingRecords() {
    return await this.prisma.product.findMany({
      include: {
        reviews: true,
        owner: true,
      },
    });
  }
}
