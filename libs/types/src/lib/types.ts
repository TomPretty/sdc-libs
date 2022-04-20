export type Edition = 'UK' | 'US' | 'AU';

export interface ArticleCountSettings {
  min: number;
  max?: number;
}

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
    articleCountSettings: ArticleCountSettings;
  };
  copy: { header: string; body: string };
}
