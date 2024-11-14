import { exec } from 'child_process';
import * as path from 'path';

export const backupDatabase = (): void => {
  const backupPath = path.join(process.cwd() + 'backups', `backup-${Date.now()}`);
  exec(`mongodump --db admin --out ${backupPath}`, (error) => {
    if (error) {
      console.error(`Backup failed: ${error.message}`);
    } else {
      console.log(`Backup successful! Backup stored at ${backupPath}`);
    }
  });
};




