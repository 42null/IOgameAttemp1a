const ASSET_NAMES = [
  'ship.svg',
  'bullet.svg',
  'astroid.svg',
  'greyAstroid.svg',
  // 'tealGreenAstroid.svg',
    // 'Astroids/astroid.svg',
  // 'Astroids/greyAstroid.svg',
  // 'Astroids/tealGreenAstroid.svg',
];

const assets = {};

const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));
    // assetName = "Astroids/tealGreenAstroid.svg";

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
