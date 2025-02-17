import { Router } from 'express';

export default Router()
  .get('/', (req, res) => {
    res.render(
      'docs',
      { 
        title: 'Trek-Dex-API', 
        message: 'documentation' 
      }
    );
  });
