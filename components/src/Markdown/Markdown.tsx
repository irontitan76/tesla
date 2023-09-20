import { Stack, StackProps } from '@mui/material';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';

export interface MarkdownProps extends StackProps<'div'>, MDXRemoteProps {}

export const Markdown = ({
  components,
  options,
  source,
  ...rest
}: MarkdownProps) => {
  return (
    <Stack {...rest}>
      <MDXRemote
        components={components}
        options={{
          mdxOptions: {
            // https://github.com/hashicorp/next-mdx-remote/issues/350#issuecomment-1461558918
            development: process.env.NODE_ENV === 'development',
          },
          ...options,
        }}
        source={source}
      />
    </Stack>
  )
};

export default Markdown;
