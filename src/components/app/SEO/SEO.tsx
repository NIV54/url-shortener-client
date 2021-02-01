import { title } from "process";
import React from "react";
import { Helmet } from "react-helmet";

import { metadata } from "./metadata";

interface Props {
  title: string;
  pathSlug: string;
  description?: string;
  keywords?: string[];
}

export const SEO = ({ title: pageTitle, pathSlug, description, keywords = [] }: Props) => {
  const { siteTitle, siteDescription, siteUrl, siteKeywords } = metadata;
  const metaDescription = description || siteDescription;
  const url = siteUrl + pathSlug;

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
        dir: "ltr"
      }}
      title={pageTitle}
      titleTemplate={`${siteTitle} | %s`}
      meta={[
        {
          property: `og:title`,
          content: pageTitle
        },

        {
          name: `description`,
          content: siteDescription
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: "og:url",
          content: url
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        },
        {
          name: "keywords",
          content: siteKeywords.concat(keywords).join()
        }
      ]}
      link={[
        {
          rel: "canonical",
          href: url
        }
      ]}
    />
  );
};
