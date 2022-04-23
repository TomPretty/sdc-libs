export type Edition = 'UK' | 'US' | 'AU';

export interface ArticleCountSettings {
  min: number;
  max?: number;
}

export interface HeaderRequest {
  edition: Edition;
}

export interface HeaderTest {
  name: string;
  targeting: {
    edition: Edition;
  };
  copy: string;
}

export interface BannerRequest {
  articleCount: number;
  edition: Edition;
}

export interface Copy {
  header: string;
  body: string;
}

export interface BannerTest {
  name: string;
  isOn: boolean;
  targeting: {
    edition: Edition;
    articleCountSettings: ArticleCountSettings;
  };
  copy: { header: string; body: string };
}
