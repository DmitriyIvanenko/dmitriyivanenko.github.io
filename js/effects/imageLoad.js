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
    'images/animations/surfing.mp4',
    'images/animations/david.mp4'
  ];

  var grid;
  var loadingElement;
  var loadedCount = 0;
  var initialLoadCount = Math.min(4, mediaUrls.length);
  var lazyLoadObserver;
  var playbackObserver;

  function updateLoadingText() {
    if (!loadingElement) {
      return;
    }
    if (loadedCount >= initialLoadCount) {
      loadingElement.parentNode && loadingElement.parentNode.removeChild(loadingElement);
      return;
    }
    loadingElement.textContent = 'Loading animations… (' + loadedCount + ' / ' + initialLoadCount + ' ready)';
  }

  function isVideo(url) {
    return /\.mp4$/i.test(url);
  }

  function createMediaElement(url) {
    if (isVideo(url)) {
      var video = document.createElement('video');
      video.autoplay = true;
      video.defaultMuted = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.className = 'img-responsive';
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');

      var source = document.createElement('source');
      source.src = url;
      source.type = 'video/mp4';
      video.appendChild(source);

      video.addEventListener('ended', function() {
        video.currentTime = 0;
        playVideo(video);
      });

      return video;
    }

    var img = document.createElement('img');
    img.src = url;
    img.alt = '';
    img.className = 'img-responsive';
    img.loading = 'lazy';
    img.decoding = 'async';
    return img;
  }

  function createPlaceholder(url) {
    var li = document.createElement('li');
    li.className = 'animation-placeholder shown';
    li.setAttribute('data-src', url);

    var loader = document.createElement('div');
    loader.className = 'animation-placeholder-inner';
    loader.textContent = 'Loading…';
    li.appendChild(loader);
    return li;
  }

  function replacePlaceholder(placeholder, element) {
    placeholder.classList.remove('animation-placeholder');
    placeholder.classList.add('shown');
    placeholder.innerHTML = '';
    placeholder.appendChild(element);
  }

  function completeOne() {
    loadedCount += 1;
    updateLoadingText();
  }

  function markReadyOnce(element) {
    var isReady = false;
    var readyEvent = element.tagName === 'VIDEO' ? 'loadeddata' : 'load';
    var fallbackTimer = setTimeout(markReady, 4000);

    function markReady() {
      if (isReady) {
        return;
      }
      isReady = true;
      clearTimeout(fallbackTimer);
      completeOne();
    }

    element.addEventListener(readyEvent, markReady, { once: true });
    element.addEventListener('error', markReady, { once: true });
  }

  function playVideo(video) {
    if (!video || video.tagName !== 'VIDEO') {
      return;
    }

    var playPromise = video.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(function() {
        // Muted inline videos usually autoplay; if a browser blocks one, the poster frame still remains visible.
      });
    }
  }

  function loadMedia(placeholder) {
    if (!placeholder || placeholder.getAttribute('data-loaded') === 'true') {
      return;
    }

    placeholder.setAttribute('data-loaded', 'true');

    var url = placeholder.getAttribute('data-src');
    var mediaElement = createMediaElement(url);
    markReadyOnce(mediaElement);
    replacePlaceholder(placeholder, mediaElement);

    if (mediaElement.tagName === 'VIDEO') {
      playVideo(mediaElement);
    }
  }

  function setPlayback(placeholder, shouldPlay) {
    var video = placeholder.querySelector('video');
    if (!video) {
      return;
    }

    if (shouldPlay) {
      playVideo(video);
    } else {
      video.pause();
    }
  }

  function observeItem(placeholder, index) {
    if (lazyLoadObserver) {
      lazyLoadObserver.observe(placeholder);
    }

    if (playbackObserver) {
      playbackObserver.observe(placeholder);
    }

    if (!lazyLoadObserver || index < initialLoadCount) {
      loadMedia(placeholder);
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    grid = document.getElementById('animation-grid');
    loadingElement = document.getElementById('animation-loading');
    loadedCount = 0;
    updateLoadingText();

    if (!grid) {
      return;
    }

    if ('IntersectionObserver' in window) {
      lazyLoadObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            loadMedia(entry.target);
            lazyLoadObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '700px 0px',
        threshold: 0.01
      });

      playbackObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          setPlayback(entry.target, entry.isIntersecting || entry.intersectionRatio > 0);
        });
      }, {
        rootMargin: '150px 0px',
        threshold: 0.01
      });
    }

    mediaUrls.forEach(function(url, index) {
      var placeholder = createPlaceholder(url);
      grid.appendChild(placeholder);
      observeItem(placeholder, index);
    });
  });
})();
