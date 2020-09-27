import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "quote-of-the-day-edits",

  initialize(container) {
    withPluginApi("0.8.32", function (api) {
      api.decorateWidget("home-logo:after", (helper) => {
        const currentPath = helper.register
          .lookup("service:router")
          .get("_router.currentPath");

        if (
          helper.widget.currentUser &&
          !helper.widget.site.mobileView &&
          currentPath.indexOf("topic") === -1
        ) {
          return helper.attach("quote-of-the-day-widget");
        }
      });
    });
  },
};
