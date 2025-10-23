import { appDataSource } from './data-source';

type Action = 'run' | 'revert' | 'show';

async function bootstrap(action: Action) {
  await appDataSource.initialize();
  try {
    switch (action) {
      case 'run':
        await appDataSource.runMigrations();
        break;
      case 'revert':
        await appDataSource.undoLastMigration();
        break;
      case 'show':
        console.log(await appDataSource.showMigrations());
        break;
      default:
        throw new Error(`Unsupported action: ${action}`);
    }
  } finally {
    await appDataSource.destroy();
  }
}

const action = process.argv[2] as Action;
if (!action) {
  throw new Error('Migration action required');
}

bootstrap(action).catch((error) => {
  console.error(error);
  process.exit(1);
});
