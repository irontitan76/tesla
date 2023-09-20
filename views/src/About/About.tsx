import { Box } from '@mui/material';
import { createServerSupabaseClient } from '@nexus/utils/supabase/serverClient';
import { Markdown } from '@nexus/components';
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
      component='div'
      display='flex'
      justifyContent='center'
      width='100%'
    >
      <Box
        component='div'
        maxWidth={700}
        px={2}
        py={1}
        sx={{
          overflowY: 'auto',
        }}
      >
        <Markdown source={markdown} />
      </Box>
    </Box>
  );
};

export default About;
