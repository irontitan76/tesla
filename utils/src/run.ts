// import { spawn } from 'child_process';

// export const run = (command: string, args: string[]) => {
//   return new Promise((resolve, reject) => {
//     const cmd = spawn(command, args, { shell: true });
//     let output = '';

//     cmd.stdout.on('data', (data) => {
//       output += data;
//     });

//     cmd.stderr.on('data', (data) => {
//       reject(data);
//     });

//     cmd.on('close', (code) => {
//       if (code === 0) {
//         resolve(output);
//       } else {
//         reject(`Process exited with code ${code}`);
//       }
//     });
//   });
// };

export {};
