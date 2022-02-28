import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    console.log('🚀 ~ HttpExceptionFilter ~ request', request);
    const response = context.getRequest<Response>();

    response.send({
      message: exception.getResponse(),
      status: exception.getStatus(),
    });
  }
}
