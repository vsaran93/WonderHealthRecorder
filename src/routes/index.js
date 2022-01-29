const express = require('express');

const router = express.Router();
const patientRoutes = require('./patient.route');

const defaultRoutes = [
  {
    path: '/patient',
    route: patientRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
