import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'rentezy.com',
    // host: '127.0.0.1',
  },
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tsconfigPaths from "vite-tsconfig-paths";


// // https://vitejs.dev/config/
// export default defineConfig({
//   // This changes the out put dir from dist to build
//   // comment this out if that isn't relevant for your project
//   build: {
//     outDir: "build",
//   },
//   plugins: [tsconfigPaths(), react()],
//   server: {
//     host: '127.0.0.1',
//   },
// });