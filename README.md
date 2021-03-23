A Gallery website developed with React/Gatsby. Pulls content from the Strapi Headless CMS maintained in the pjamieson/iartx-strapi repository.

This is a complete re-write of the Angular JS version of iArtX.com that was released in 2017 and last updated (except for content) in Sept 2018. This project is based on code from and lessons learned while developing the live blake-dot-art project, but with the latest versions of the frameworks and packages used:

**React 17 (from 16):**

Having worked with both Angular and React, I personally prefer React. Especially with image-intensive sites like this one, where React-dependent Gatsby really shines.

**Gatsby 3 (from 2):**

In Gatsby 3, the biggest change from Gatsby 2 is the recommended migration from gatsby-image to gatsby-plugin-image.

The latest version of the gatsby-source-filesystem package (3.1.0) is unable to create localFile nodes (in gatsby-node.js) for multiple image media types, as needs to be done for those images when pulled from Strapi v3.5.x. So, I have reverted to version 2.11.0 of that package, and that works as expected. I suspect the cause is a bug in the newer version (the same error was seen in earlier versions of v2), and I will test newer versions as they are released.

Dynamic GatsbyImage elements from the latest gatsby-plugin-image (v1.2.0-next.0) are not playing well with hover effects and masks where I use them, essentially, to create image buttons. Until that issue is resolved, I am employing the basic HTML img element to achieve the desired functionality and look.

**Strapi 3.5.3:**

Developing the Strapi CMS backend can be challenging, with inconsistent documentation and uncertainty about how committed they are to supporting an evolving Gatsby frontend. Their gatsby-source-strapi package (v0.0.12) has not been updated since April 2020.

However, I like that Strapi is Open Source, and that I can develop and maintain my own server on an AWS EC2 instance. I have it working fine on the blake.art site--including serving as the secure backend for credit card processing through Stripe, and shipping labels through Shippo--and I need no additional backend functionality for this site at this time.

**Bootstrap 4 and MDBBootstrap 5 (from 4):**


**Additional Features Supported**

Images stored in AWS S3 bucket

Google Analytics

SEO & Google Search Metadata

Facebook Pixel

MailChimp mailing list integration

Stripe credit card payment processing

Shippo shipping labels integration
