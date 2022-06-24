const ASSET_NAMES = [
    'ship.svg',
    'bullet.svg',
    'bulletLime1.svg',
    'astroid.svg',
    'greyastroid.svg',
    'tealGreenAstroid.svg',
    'plumes/exaust_gif_1.gif',
];

const assets = {};

const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

function downloadAsset(assetName) {
  return new Promise(resolve => {
    const asset = new Image();
    asset.onload = () => {
      console.log(`Downloaded ${assetName}`);
      assets[assetName] = asset;
      resolve();
    };
    asset.src = `/assets/${assetName}`;
  });
}

export const downloadAssets = () => downloadPromise;

export const getAsset = assetName => assets[assetName];
