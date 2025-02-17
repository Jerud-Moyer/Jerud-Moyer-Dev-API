import { Router } from 'express';

export default Router()
  .get('/', (req, res) => {
    res.render(
      'trekdex/docs',
      { 
        title: 'Trek-Dex-API', 
        message: 'documentation' 
      }
    );
  });
