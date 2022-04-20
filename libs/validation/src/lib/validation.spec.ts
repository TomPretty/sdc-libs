import { headerRequestFactory } from '@sdc-libs/factories';
import { headerRequestSchema } from './validation';

describe('headerRequestSchema', () => {
  it('validates a valid header request', () => {
    const headerRequest = headerRequestFactory.build();

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
