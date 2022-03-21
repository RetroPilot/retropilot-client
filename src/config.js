const config = {
  /**
   * The address at which the website is hosted.
   */
  publicUrl: process.env.REACT_APP_PUBLIC_URL,

  /**
   * The address at which the API is accessible.
   */
  apiUrl: process.env.REACT_APP_API_URL,

  /**
   * The name displayed in the website title.
   */
  websiteName: process.env.REACT_APP_WEBSITE_NAME,
};

console.log({ config });

export default config;
