const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  /* */
  if (window.pageYOffset > 535) {
    //Show bactotopButton
    backToTopButton.style.display = "block";
    backToTopButton.classList.remove("btnExit");
    backToTopButton.classList.add("btnEntrance");
  } else {
    //Hide backtotopButton
    backToTopButton.style.display = "none";
    backToTopButton.classList.add("btnExit");
  }
}

backToTopButton.addEventListener("click", backtoTop);

function backtoTop() {
  window.scrollTo(0, 0);
}

//     NavBar smooth effect

const list = document.getElementsByClassName("main-nav")[0];

// easing functions from http://goo.gl/5HLl8
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

Math.easeInCubic = function(t, b, c, d) {
  var tc = (t /= d) * t * t;
  return b + c * tc;
};

Math.inOutQuintic = function(t, b, c, d) {
  var ts = (t /= d) * t,
    tc = ts * t;
  return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

// requestAnimationFrame for Smart Animating from http://goo.gl/sx5sts
var requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function scrollTo(to, callback, duration) {
  // because it's so fucking difficult to detect the scrolling element, just move them all
  function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
  }

  function position() {
    return (
      document.documentElement.scrollTop ||
      document.body.parentNode.scrollTop ||
      document.body.scrollTop
    );
  }
  var start = position(),
    change = to - start,
    currentTime = 0,
    increment = 20;
  duration = typeof duration === "undefined" ? 500 : duration;
  var animateScroll = function() {
    // increment the time
    currentTime += increment;
    // find the value with the quadratic in-out easing function
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    // move the document.body
    move(val);
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (callback && typeof callback === "function") {
        // the animation is done so lets callback
        callback();
      }
    }
  };
  animateScroll();
}

list.addEventListener("click", e => {
  const { target } = e;
  const to = target.getAttribute("data-target");
  const element = document.getElementById(to);
  const bodyRect = document.body.getBoundingClientRect();
  const elemRect = element.getBoundingClientRect();
  const offset = elemRect.top - bodyRect.top;
  scrollTo(offset, null, 300);
});
