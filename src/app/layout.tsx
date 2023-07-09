import StyledComponentsRegistry from '~/libs/registry';
import './globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메이플 | 스트리머 랭킹',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
