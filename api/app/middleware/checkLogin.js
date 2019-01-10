module.exports = options => {
    return async function checkLogin(ctx, next) {
        if (ctx.session.user_id && ctx.session.user_id > 0) {
            await next();
        } else {
            ctx.status = 401;
        }
    };
};