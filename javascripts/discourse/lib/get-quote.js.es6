import { Promise } from "rsvp";

let getQuoteOfTheDay = () => {

  return new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resolve(JSON.parse(this.responseText))
      }
    };
    xhttp.open("GET", `https://quotes.rest/qod?${settings.quote_of_the_day_api_querystring}`, true);
    xhttp.send();
  });
};

export { getQuoteOfTheDay };
