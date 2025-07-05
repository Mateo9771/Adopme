import { Router } from 'express';

const router = Router();

router.get('/loggerTest', (req, res) => {
  req.logger.debug('DEBUG - mensaje de prueba');
  req.logger.http('HTTP - mensaje de prueba');
  req.logger.info('INFO - mensaje de prueba');
  req.logger.warning('WARNING - mensaje de prueba');
  req.logger.error('ERROR - mensaje de prueba');
  req.logger.fatal('FATAL - mensaje de prueba');

  res.send({ status: "success", message: "Logs generados correctamente" });
});

export default router;
