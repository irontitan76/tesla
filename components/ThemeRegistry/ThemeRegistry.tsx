'use client';
import { ColorModeProvider } from './ColorModeProvider';
import NextAppDirEmotionCacheProvider from './EmotionCacheProvider';

export const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ColorModeProvider>
        {children}
      </ColorModeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
