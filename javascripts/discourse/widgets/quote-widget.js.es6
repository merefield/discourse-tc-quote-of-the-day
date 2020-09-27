import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";
import { getQuoteOfTheDay } from "../lib/get-quote";

createWidget("quote-of-the-day-widget", {
  tagName: "div.qod-container",

  buildKey: () => `quote-of-the-day-widget`,

  defaultState() {
    return { loading: false, loaded: false, quoteObject: null };
  },

  getQuote(state) {
    if (state.loading) {
      return;
    }

    state.loading = true;

    getQuoteOfTheDay().then((quoteObject) => {
      state.quoteObject = quoteObject;
      state.loading = false;
      state.loaded = true;
      this.scheduleRerender();
    });
  },

  html(attrs, state) {

    if (!state.loaded) {
      this.getQuote(state);
    }

    let quoteOfTheDay, quoteOfTheDayAuthor = '';

    if (state.quoteObject !== null) {
      quoteOfTheDay = `"${state.quoteObject.contents.quotes[0].quote}"`;
      quoteOfTheDayAuthor = `, ${state.quoteObject.contents.quotes[0].author}`;
    }

    return h("div.qod-container",h("div.qod-quote-box", [
      h(
        "span.qod-quote",
        quoteOfTheDay
      ),
      h(
        "span.qod-author",
        quoteOfTheDayAuthor
      )
    ]));
  },
});
