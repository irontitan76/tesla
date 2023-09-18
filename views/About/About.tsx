import { Box, Container } from '@mui/material';
import { MDXRemote } from 'next-mdx-remote/rsc';

export const metadata = {
  title: 'About',
};

export const About = async () => {
  const res = await fetch('https://raw.githubusercontent.com/irontitan76/tesla/main/README.md')
  const markdown = await res.text();

  return (
    <Box
      color='text.primary'
      display='flex'
      justifyContent='center'
      width='100%'
    >
      <Box
        maxWidth={700}
        px={2}
        py={1}
        sx={{
          overflowY: 'auto',
        }}
      >
        <MDXRemote
          options={{
            mdxOptions: {
              // https://github.com/hashicorp/next-mdx-remote/issues/350#issuecomment-1461558918
              development: process.env.NODE_ENV === 'development',
            },
          }}
          source={markdown}
        />
      </Box>
    </Box>
  );
};

export default About;
