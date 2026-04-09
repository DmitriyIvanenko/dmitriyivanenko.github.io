// const imageUrls = [
    
// 'web.mp4',
// 'face.mp4',
// 'cleaner.mp4',
// 'tesla.mp4',
// 'bike.mp4',
// 'coca_colla.mp4',
// 'bisnod.mp4',
// 'ducatti.mp4',
// 'pottrey.mp4',
// 'sushi.mp4',
// 'asint.mp4',
// 'fly.gif',
// 'banana.mp4',
// '180.mp4',
// 'bass.mp4',
// 'good.mp4',
// 'stul.mp4',
// 'sull2.mp4',
// 'caddi.gif',
// 'sketch.mp4',
// 'remco.mp4',
// 'sushi.mp4',
// 'surfing.mp4',
// 'david.mp4'
    
//     ];

// function loadImage(url) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = (err) => reject(err);
//     img.src = url;
//   });
// }

// async function loadSequentially() {
//   for (const url of imageUrls) {
//     try {
//       const img = await loadImage(url);
//       document.body.appendChild(img);
//       console.log(`Loaded: ${url}`);
//     } catch (err) {
//       console.error(`Failed: ${url}`, err);
//     }
//   }
// }

// loadSequentially();


function loadImagesInSequence(images) {
  if (!images.length) {
    return;
  }

  var img = new Image(),
      url = images.shift();

  img.onload = function(){ loadImagesInSequence(images) };
  img.src = url;
}

loadImagesInSequence([
'images/animations/web.mp4',
'images/animations/face.mp4',
'images/animations/cleaner.mp4',
'images/animations/tesla.mp4',
'images/animations/bike.mp4',
'images/animations/coca_colla.mp4',
'images/animations/bisnod.mp4',
'images/animations/ducatti.mp4',
'images/animations/pottrey.mp4',
'images/animations/sushi.mp4',
'images/animations/asint.mp4',
'images/animations/fly.gif',
'images/animations/banana.mp4',
'images/animations/180.mp4',
'images/animations/bass.mp4',
'images/animations/good.mp4',
'images/animations/stul.mp4',
'images/animations/sull2.mp4',
'images/animations/caddi.gif',
'images/animations/sketch.mp4',
'images/animations/remco.mp4',
'images/animations/sushi.mp4',
'images/animations/surfing.mp4',
'images/animations/david.mp4'
]);