/**
 * Sends a pageview event to Google Analytics.
 * @param GA_MEASUREMENT_ID - The Google Analytics measurement ID.
 * @param url - The URL of the page.
 */
const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export { pageview };