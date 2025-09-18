import { jwtDecode } from 'jwt-decode';
import { HttpResponse, HttpResponseResolver } from 'msw';

export const authCheck = (
  request: Request,
  options?: { requiredPermission?: string }
) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    throw HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  const user = jwtDecode<{ permissions: string }>(token);

  if (!user) {
    throw HttpResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  if (options?.requiredPermission) {
    if (!user.permissions.includes(options.requiredPermission)) {
      throw HttpResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  return user;
};

export const withAuth =
  <T>(
    handler: HttpResponseResolver<T>,
    requiredPermission?: string
  ): HttpResponseResolver<T> =>
  async ({ request, ...rest }) => {
    authCheck(request, { requiredPermission });
    return handler({ request, ...rest });
  };
