import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './types';

export const supabase = createClientComponentClient<Database>();
