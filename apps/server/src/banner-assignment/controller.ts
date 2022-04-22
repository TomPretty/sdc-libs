import { BannerRequest, BannerTest, Copy } from '@sdc-libs/types';
import { assigned, Assignment, notAssigned } from '../assignment';
import { selectTest } from './selection';

type GetBannerTests = () => Promise<BannerTest[]>;

interface BannerAssignment {
  meta: {
    testName: string;
  };
  props: {
    copy: Copy;
  };
}

type CreateBannerAssignmentResponse = Assignment<BannerAssignment>;

export const getCreate =
  (getBannerTests: GetBannerTests) =>
  async (req: BannerRequest): Promise<CreateBannerAssignmentResponse> => {
    const tests = await getBannerTests();
    const test = selectTest(tests, req);

    if (!test) {
      return notAssigned();
    }

    return assigned({
      meta: {
        testName: test.name,
      },
      props: {
        copy: test.copy,
      },
    });
  };
