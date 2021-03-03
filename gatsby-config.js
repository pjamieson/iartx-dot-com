require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "iArtX.com",
    description: "iArtX.com is an online gallery offering Haitian Art and other Art of the Americas for sale. Choose from our curated selection of quality Haitian paintings and sculpture.",
    author: "@patrickjamieson",
    twitterUsername: "@patrickjamieson",
    image: "/static/BlakeCrownMask-95feca21dd9d7e285f52f75d8ca79c8a.jpg",
    siteUrl: "https://iartx.com"
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-7EWY950JWF",
      },
    },
    "gatsby-plugin-image",
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
    "gatsby-plugin-sass",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
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
        apiURL: "http://localhost:1337",
        contentTypes: [
          "artist",
          "author",
          "book",
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
    "gatsby-transformer-sharp",
  ],
};
