'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/', controller.home.index);
  router.get('/start', controller.home.start);
  router.post('/login', controller.passport.login);
  router.get('/room/list', controller.room.list);
  router.get('/platform/list', controller.platform.list);
  router.get('/order/list', controller.order.list);
  router.get('/order/detail', controller.order.detail);
  router.post('/order/add', controller.order.add);
  router.post('/order/edit', controller.order.edit);
  router.del('/order/del', controller.order.delete);
  router.post('/order/batch', controller.order.batch);
};