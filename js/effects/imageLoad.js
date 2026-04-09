const imageUrls = [
    
'web.mp4',
'face.mp4',
'cleaner.mp4',
'tesla.mp4',
'bike.mp4',
'coca_colla.mp4',
'bisnod.mp4',
'ducatti.mp4',
'pottrey.mp4',
'sushi.mp4',
'asint.mp4',
'fly.gif',
'banana.mp4',
'180.mp4',
'bass.mp4',
'good.mp4',
'stul.mp4',
'sull2.mp4',
'caddi.gif',
'sketch.mp4',
'remco.mp4',
'sushi.mp4',
'surfing.mp4',
'david.mp4'
    
    ];

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = url;
  });
}

async function loadSequentially() {
  for (const url of imageUrls) {
    try {
      const img = await loadImage(url);
      document.body.appendChild(img);
      console.log(`Loaded: ${url}`);
    } catch (err) {
      console.error(`Failed: ${url}`, err);
    }
  }
}

loadSequentially();
