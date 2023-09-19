import { Database } from './types';

export type Device = Database['public']['Tables']['batteries']['Row'];
export type Transformer = Database['public']['Tables']['transformers']['Row'];
export type Configuration = Database['public']['Tables']['configurations']['Row'];
