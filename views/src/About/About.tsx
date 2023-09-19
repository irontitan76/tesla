import { Box } from '@mui/material';
import { createServerSupabaseClient } from '@nexus/utils/supabase/serverClient';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { redirect } from 'next/navigation';

export const aboutMetadata = {
  title: 'About',
};

export const About = async () => {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  const res = await fetch('https://raw.githubusercontent.com/irontitan76/tesla/main/README.md');
  const markdown = await res.text();

  return (
    <Box
      color='text.primary'
      // Issue: https://github.com/pmndrs/drei/issues/823
      component='div'
      display='flex'
      justifyContent='center'
      width='100%'
    >
      <Box
      // Issue: https://github.com/pmndrs/drei/issues/823
        component='div'
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
