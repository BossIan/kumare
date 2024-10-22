import {defineConfig} from '@junobuild/config';

export default defineConfig({
  satellite: {
    id: 'your-own-canister-id-here',
    source: 'dist'
  }
});
