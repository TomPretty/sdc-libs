import { HeaderRequest, HeaderTest } from '@sdc-libs/types';
import { assigned, Assignment, notAssigned } from '../assignment';
import { selectTest } from './selection';

type GetHeaderTests = () => Promise<HeaderTest[]>;

interface HeaderAssignment {
  meta: {
    testName: string;
  };
  props: {
    copy: string;
  };
}

type CreateHeaderAssignmentResponse = Assignment<HeaderAssignment>;

export const getCreate =
  (getBannerTests: GetHeaderTests) =>
  async (req: HeaderRequest): Promise<CreateHeaderAssignmentResponse> => {
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
