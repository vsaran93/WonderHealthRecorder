const express = require('express');

const router = express.Router();
const patientRoutes = require('./patient.route');
const authRoutes = require('./auth.route');
const knowledgeBaseRoute = require('./knowledge-base.route');

const defaultRoutes = [
  {
    path: '/patient',
    route: patientRoutes,
  },
  {
    path: '/knowledge-base',
    route: knowledgeBaseRoute,
  },
  {
    path: '/user',
    route: authRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
