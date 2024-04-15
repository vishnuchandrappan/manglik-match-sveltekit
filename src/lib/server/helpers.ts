/**
 * Generate baseURL from request object
 * @param request Request object
 * @returns baseURL as string
 */
export const getBaseURL = ({ url }: Pick<Request, 'url'>) => new URL(url).origin;
