import { HeaderRequest } from '@sdc-libs/types';
import { headerRequestSchema } from './validation';

describe('headerRequestSchema', () => {
  it('validates a valid header request', () => {
    const headerRequest: HeaderRequest = {
      articleCount: 0,
      edition: 'UK',
    };

    const result = headerRequestSchema.safeParse(headerRequest);

    expect(result.success).toBeTruthy();
  });

  it('invalidates an invalid header request', () => {
    const headerRequest = {
      foo: 'bar',
    };

    const result = headerRequestSchema.safeParse(headerRequest);

    expect(result.success).toBeFalsy();
  });
});
