require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "iArtX.com - The Jamieson Collection",
    description: "iArtX.com features a curated selection of Haitian Art, Art Books, Caribbean Literature, and Sports Trading Cards.",
    author: "@patrickjamieson",
    twitterUsername: "@patrickjamieson",
    image: "/static/BlakeCrownMask-95feca21dd9d7e285f52f75d8ca79c8a.jpg",
    siteUrl: "https://iartx.com"
  },
  plugins: [
    "gatsby-plugin-advanced-sitemap",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          `${process.env.GATSBY_GOOGLE_ANALYTICS_ID}`,
          `${process.env.GATSBY_GOOGLE_ADS_ID}`,
        ],
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          respectDNT: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "iArtX.com",
        short_name: "iArtX",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-react-helmet-canonical-urls",
      options: {
        siteUrl: "https://iartx.com",
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: `${process.env.GATSBY_STRAPI_API_URL}`,
        collectionTypes: [
          "artist",
          "author",
          "book",
          "cardseries",
          "country",
          "email",
          "order",
          "painting",
          "player",
          "promotion",
          "subgenre",
          "tradingcard",
        ],
        queryLimit: 1000,
      },
    },
  ],
};
