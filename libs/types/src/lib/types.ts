export interface HeaderRequest {
  edition: 'UK' | 'US' | 'AU';
}

export interface BannerRequest {
  articleCount: number;
  edition: 'UK' | 'US' | 'AU';
}

export interface BannerTest {
  name: string;
  copy: { header: string; body: string };
}
