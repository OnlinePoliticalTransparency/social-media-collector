/* eslint-disable no-prototype-builtins */
import extractAdReasons from '../extractAdReasons';

const videowallIframeCompanionAdRenderer = ({ videowallIframeCompanionAdRenderer: ad }) => {
  const [advertiser, destUrl] = ad.hasOwnProperty('onClickCommands')
    ? [new URL(ad.onClickCommands[0].loggingUrls[0].baseUrl).searchParams.get('adurl')]
    : ad.hasOwnProperty('clickthroughEndpoint') &&
      ad.clickthroughEndpoint.hasOwnProperty('commandMetadata')
    ? ad.clickthroughEndpoint.commandMetadata.webCommandMetadata.url.includes('?')
      ? [
          new URL(ad.clickthroughEndpoint.commandMetadata.webCommandMetadata.url).searchParams.get(
            'click'
          )
        ]
      : [null, ad.clickthroughEndpoint.urlEndpoint]
    : [];
  const { reasons, title } = extractAdReasons(ad.adInfoRenderer.adHoverTextButtonRenderer);
  const adId = ad.adVideoId;

  return {
    type: 'videowallIframeCompanionAd',
    reasons,
    title,
    advertiser,
    adId,
    destUrl
  };
};

export default videowallIframeCompanionAdRenderer;
