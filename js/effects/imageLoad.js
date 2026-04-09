(function() {
  var mediaUrls = [
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
  ];

  var grid;
  var loadingElement;
  var remaining = 0;

  function updateLoadingText() {
    if (!loadingElement) {
      return;
    }
    if (remaining <= 0) {
      loadingElement.parentNode && loadingElement.parentNode.removeChild(loadingElement);
      return;
    }
    loadingElement.textContent = 'Loading animations… (' + remaining + ' remaining)';
  }

  function createMediaElement(url, srcUrl) {
    if (url.toLowerCase().endsWith('.mp4')) {
      var video = document.createElement('video');
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.className = 'img-responsive';
      video.setAttribute('webkit-playsinline', '');

      var source = document.createElement('source');
      source.src = srcUrl;
      source.type = 'video/mp4';
      video.appendChild(source);
      return video;
    }

    var img = document.createElement('img');
    img.src = srcUrl;
    img.alt = '';
    img.className = 'img-responsive';
    return img;
  }

  function appendMedia(element) {
    var li = document.createElement('li');
    li.appendChild(element);
    if (grid) {
      grid.appendChild(li);
    } else {
      console.error('Grid element not found');
    }
  }

  function fallbackMedia(url) {
    var element = createMediaElement(url, url);
    appendMedia(element);
  }

  function completeOne() {
    remaining -= 1;
    updateLoadingText();
  }

  function loadMedia(url) {
    if (!window.fetch) {
      console.warn('Fetch not supported: falling back to direct media URLs');
      fallbackMedia(url);
      completeOne();
      return Promise.resolve();
    }

    return fetch(url).then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok for ' + url);
      }
      return response.blob();
    }).then(function(blob) {
      var objectUrl = URL.createObjectURL(blob);
      var mediaElement = createMediaElement(url, objectUrl);
      mediaElement.addEventListener('loadeddata', function() {
        URL.revokeObjectURL(objectUrl);
      }, { once: true });
      appendMedia(mediaElement);
      completeOne();
      return mediaElement;
    }).catch(function(err) {
      console.warn('Fetch failed for', url, '- falling back to direct URL', err);
      fallbackMedia(url);
      completeOne();
      return null;
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    grid = document.getElementById('grid');
    loadingElement = document.getElementById('animation-loading');
    remaining = mediaUrls.length;
    updateLoadingText();

    mediaUrls.forEach(function(url) {
      loadMedia(url);
    });
  });
})();