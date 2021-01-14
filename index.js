(() => {
  let currentScene = 0;
  let prevScrollHeight = 0;

  const sceneInfo = [
    {
      type: 'sticky',
      scrollHeight: 0,
      heightNum: 4,
      elem: {
        $container: document.body.querySelector('#scene-0'),
        $pencelLogo: document.body.querySelector('.pencel-logo'),
        $messageA: document.body.querySelector('.main-message.a'),
        $messageB: document.body.querySelector('.main-message.b'),
        $pencel: document.body.querySelector('.pencel'),
        $strokeEffect: document.body.querySelector('stroke-effct-svg'),
      },
      value: {
        pencel_logo_opacity: [1, 0, {start: 0.8, end: 0.9}],
        pencel_logo_width_fast: [1000, 200, {start: 0, end: 0.4}],
        pencel_logo_width_slow: [200, 50, {start: 0.4, end: 0.8}],
        pencel_logo_translateX_slow: [-10, -20, {start: 0.2, end: 0.4}],
        pencel_logo_translateX_fast: [-20, -50, {start: 0.4, end: 0.8}],
        message_a_opacity: [0, 1, {start: 0.2, end: 0.4}],
        message_a_translateY: [20, -20, {start: 0.2, end: 0.4}],
        message_b_opacity: [0, 1, {start: 0.4, end: 0.6}],
        message_b_translateY: [20, -20, {start: 0.4, end: 0.6}],
        pencel_rotate: [-120, -200, {start: 0.3, end: 0.7}],
        pencel_right: [-10, 70, {start: 0.3, end: 0.7}],
        pencel_bottom: [-80, 100, {start: 0.3, end: 0.7}],
        stroke_effect_dashedoffset: [1401, -1401, {start: 0.3, end: 0.8}],
      },
    },
    {
      type: 'normal',
      scrollHeight: 0,
      elem: {
        $container: document.body.querySelector('#scene-1'),
        $description: document.body.querySelector('.description'),
      },
      value: {
        description_opacity: [0, 1, {start: 0, end: 0.1}],
        description_translateY: [40, 0, {start: 0, end: 0.1}],
      },
    },
  ];

  const setSceneHeight = () => {
    sceneInfo.forEach((scene) => {
      if (scene.type === 'sticky') {
        scene.scrollHeight = scene.heightNum * window.innerHeight;
      } else {
        scene.scrollHeight = scene.elem.$description.offsetHeight + window.innerHeight * 0.5;
      }
      scene.elem.$container.style.height = `${scene.scrollHeight}px`;
    });
  };

  const setCurrentBodyId = () => {
    let totalHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalHeight += sceneInfo[i].scrollHeight;
      if (totalHeight >= window.pageYOffset) {
        currentScene = i;
        break;
      }
    }
    setPrevHeight();

    document.body.id = `show-scene-${currentScene}`;
  };

  const setPrevHeight = () => {
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
  };

  const scrollLoop = () => {
    if (pageYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      prevScrollHeight += sceneInfo[currentScene].scrollHeight;
      currentScene++;
      document.body.id = `show-scene-${currentScene}`;
    } else if (pageYOffset < prevScrollHeight) {
      currentScene--;
      prevScrollHeight -= sceneInfo[currentScene].scrollHeight;
      document.body.id = `show-scene-${currentScene}`;
    }

    setScrollAnimation();
  };

  const setScrollAnimation = () => {
    const currentHeight = pageYOffset - prevScrollHeight;
    const sceneValue = sceneInfo[currentScene].value;
    const sceneElem = sceneInfo[currentScene].elem;
    const scrollRatio = currentHeight / sceneInfo[currentScene].scrollHeight;

    switch (currentScene) {
      case 0:
        const pencel_logo_width_fast = calculateStyleValue(
          currentHeight,
          sceneValue.pencel_logo_width_fast,
        );
        const pencel_logo_width_slow = calculateStyleValue(
          currentHeight,
          sceneValue.pencel_logo_width_slow,
        );
        const pencel_logo_translateX_fast = calculateStyleValue(
          currentHeight,
          sceneValue.pencel_logo_translateX_fast,
        );
        const pencel_logo_translateX_slow = calculateStyleValue(
          currentHeight,
          sceneValue.pencel_logo_translateX_slow,
        );
        const pencel_logo_opacity = calculateStyleValue(
          currentHeight,
          sceneValue.pencel_logo_opacity,
        );
        sceneElem.$pencelLogo.style.opacity = `${pencel_logo_opacity}`;

        if (scrollRatio < 0.4) {
          sceneElem.$pencelLogo.style.width = `${pencel_logo_width_fast}vw`;
          sceneElem.$pencelLogo.style.transform = `translate3d(${pencel_logo_translateX_slow}%, -50%, 0)`;
        } else {
          sceneElem.$pencelLogo.style.width = `${pencel_logo_width_slow}vw`;
          sceneElem.$pencelLogo.style.transform = `translate3d(${pencel_logo_translateX_fast}%, -50%, 0)`;
        }
    }
  };

  const calculateStyleValue = (currentHeight, styleValue) => {
    const scrollRatio = currentHeight / sceneInfo[currentScene].scrollHeight;
    if (styleValue.length === 3) {
      return calculatePartStyleValue(scrollRatio, styleValue);
    }

    return styleValue[0] + (styleValue[1] - styleValue[0]) * scrollRatio;
  };

  const calculatePartStyleValue = (scrollRatio, styleValue) => {
    const partScrollRatio =
      (scrollRatio - styleValue[2].start) / (styleValue[2].end - styleValue[2].start);

    if (partScrollRatio <= 0) {
      return styleValue[0];
    }
    if (partScrollRatio >= 1) {
      return styleValue[1];
    }

    return styleValue[0] + (styleValue[1] - styleValue[0]) * partScrollRatio;
  };

  window.addEventListener('load', () => {
    setSceneHeight();
    setCurrentBodyId();
  });
  window.addEventListener('scroll', scrollLoop);
})();
