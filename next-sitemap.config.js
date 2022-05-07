let siteUrl = 'https://www.hideoutvg.com/';

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            { userAgent: "*", allow: "/"},
        ],
        additionalSitemaps: [
            `${siteUrl}sitemap.xml`,
            `${siteUrl}sitemap-0.xml`,
        ],
    },
    sitemapSize: 999999999,
}