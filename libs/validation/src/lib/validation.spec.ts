import {
  bannerRequestFactory,
  headerRequestFactory,
} from '@sdc-libs/factories';
import { bannerRequestSchema, headerRequestSchema } from './validation';

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

describe('bannerRequestSchema', () => {
  it('validates a valid banner request', () => {
    const bannerRequest = bannerRequestFactory.build();

    const result = bannerRequestSchema.safeParse(bannerRequest);

    expect(result.success).toBeTruthy();
  });

  it('invalidates an invalid banner request', () => {
    const bannerRequest = {
      foo: 'bar',
    };

    const result = bannerRequestSchema.safeParse(bannerRequest);

    expect(result.success).toBeFalsy();
  });
});
