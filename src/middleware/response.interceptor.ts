import {
  Injectable,
  NestInterceptor, // Interceptor를 생성하기 위해 구현해야 하는 인터페이스, 요청 처리 전후에 실행되는 미들웨어와 유사한 개념
  ExecutionContext, // 현재 실행 중인 요청과 관련된 컨텍스트 정보를 제공하는 클래스, 요청 객체, 응답 객체, 미들웨어, 파이프라인 등의 정보 포함
  CallHandler, //  인터셉터 내부에서 호출되는 핸들러 함수를 감싸는 역할, 인터셉터에서 요청을 가로채고 수정한 후, 원래의 핸들러 함수를 호출하여 처리를 계속
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs'; 
// Observable : 데이터 스트림을 나타내는 객체, 비동기적으로 발생하는 값을 표현
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interface/response.interface';

@Injectable()
export class ResponseFormatInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    _: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((resData) => ({
        message: resData?.message ?? "OK",
        data: resData?.data ?? [],
      })),
    );
  }
}