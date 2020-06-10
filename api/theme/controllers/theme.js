"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.theme.search(ctx.query);
    } else {
      entities = await strapi.services.theme.find(ctx.query);
    }

    return entities.map((entity) => {
      const theme = sanitizeEntity(entity, {
        model: strapi.models.theme,
      });
      const themePosts = theme.posts;
      if (themePosts.length > 0) {
        themePosts.sort(function (a, b) {
          return b.updated_at - a.updated_at;
        });
        theme.last_post = themePosts[0].updated_at;
      } else {
        theme.last_post = null;
      }
      return theme;
    });
  },
};
