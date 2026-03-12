import {
  type ExecutionContext,
  Injectable,
} from '@nestjs/common'

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class HeaderAuthGuard extends AuthGuard('jwt') {}