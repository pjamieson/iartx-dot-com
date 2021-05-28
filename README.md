A Gallery website developed with React/Gatsby. Pulls content from the Strapi Headless CMS maintained in the pjamieson/iartx-strapi repository.

This is a complete re-write of the Angular JS version of iArtX.com that was released in 2017 and last updated (except for content) in Sept 2018. This project is based on code from and lessons learned while developing the live blake-dot-art project, but with the latest versions of the frameworks and packages used:

**React 17 (from 16):**

Having worked with both Angular and React, I personally prefer React. Especially with image-intensive sites like this one, where React-dependent Gatsby really shines.

**Gatsby 3 (from 2):**

In Gatsby 3, the biggest change from Gatsby 2 is the recommended migration from gatsby-image to gatsby-plugin-image.

**Strapi 3.6.2:**

Developing the Strapi CMS backend can be challenging, with inconsistent documentation and uncertainty about how committed they are to supporting an evolving Gatsby frontend. However, I like that Strapi is Open Source, and that I can develop and maintain my own server on an AWS EC2 instance. In addition to providing content, I have it also serving as the secure backend for credit card processing through Stripe, and shipping labels through Shippo.

In late May 2021, Strapi finally updated their gatsby-source-strapi plugin package to support the Gatsby 3 update and multiple image content types, so it now looks good going forward.

**Bootstrap 4 and MDBBootstrap 5 (from 4):**


**Additional Features Supported**

Images stored in AWS S3 bucket

Google Analytics

SEO & Google Search Metadata

Facebook Pixel

MailChimp mailing list integration

Stripe credit card payment processing

Shippo shipping labels integration
