import { headerRequestFactory } from '@sdc-libs/factories';
import { headerRequestSchema } from '@sdc-libs/validation';
import { NextFunction, Request, Response } from 'express';
import { validate } from './validation';

describe('validate', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const mockNextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      sendStatus: jest.fn(),
    };
  });

  it('passes a valid request on to the next function', () => {
    mockRequest.body = headerRequestFactory.build();

    validate(headerRequestSchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockNextFunction).toHaveBeenCalledTimes(1);
  });

  it('returns a 400 for an invalid request', () => {
    mockRequest.body = { foo: 'bar' };

    validate(headerRequestSchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
  });
});
