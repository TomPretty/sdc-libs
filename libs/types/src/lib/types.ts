export type Edition = 'UK' | 'US' | 'AU';
export interface HeaderRequest {
  edition: Edition;
}

export interface BannerRequest {
  articleCount: number;
  edition: Edition;
}

export interface BannerTest {
  name: string;
  targeting: {
    edition: Edition;
  };
  copy: { header: string; body: string };
}
