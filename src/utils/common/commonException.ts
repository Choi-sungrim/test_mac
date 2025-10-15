import {
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export function handleDatabaseError(error: unknown, message: string): never {
  if (error instanceof NotFoundException) {
    throw error;
  }

  if (error instanceof HttpException) {
    throw error;
  }

  console.error('Unhandled Database/Service Layer Error:', error);

  throw new InternalServerErrorException(`${message}`);
}
