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
        $strokeEffect: document.body.querySelector('#stroke-effct-svg'),
      },
      value: {
        pencel_logo_opacity: [1, 0, {start: 0.8, end: 1}],
        pencel_logo_width_fast: [1000, 200, {start: 0, end: 0.4}],
        pencel_logo_width_slow: [200, 50, {start: 0.4, end: 0.8}],
        pencel_logo_translateX_slow: [-10, -20, {start: 0.2, end: 0.4}],
        pencel_logo_translateX_fast: [-20, -50, {start: 0.4, end: 0.8}],
        message_a_opacity_in: [0, 1, {start: 0.1, end: 0.2}],
        message_a_opacity_out: [1, 0, {start: 0.3, end: 0.4}],
        message_a_translateY: [20, 0, {start: 0.1, end: 0.2}],
        message_b_opacity_in: [0, 1, {start: 0.4, end: 0.5}],
        message_b_opacity_out: [1, 0, {start: 0.6, end: 0.7}],
        pencel_rotate: [-120, -200, {start: 0.3, end: 0.8}],
        pencel_right: [-10, 70, {start: 0.3, end: 0.8}],
        pencel_bottom: [-80, 100, {start: 0.3, end: 0.8}],
        stroke_effect_dashedoffset_in: [1401, 0, {start: 0.2, end: 0.4}],
        stroke_effect_dashedoffset_out: [0, -1401, {start: 0.6, end: 0.8}],
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
        const message_a_opacity_in = calculateStyleValue(
          currentHeight,
          sceneValue.message_a_opacity_in,
        );
        const message_a_opacity_out = calculateStyleValue(
          currentHeight,
          sceneValue.message_a_opacity_out,
        );
        const message_a_translateY = calculateStyleValue(
          currentHeight,
          sceneValue.message_a_translateY,
        );
        const message_b_opacity_in = calculateStyleValue(
          currentHeight,
          sceneValue.message_b_opacity_in,
        );
        const message_b_opacity_out = calculateStyleValue(
          currentHeight,
          sceneValue.message_b_opacity_out,
        );
        const stroke_effect_dashedoffset_in = calculateStyleValue(
          currentHeight,
          sceneValue.stroke_effect_dashedoffset_in,
        );
        const stroke_effect_dashedoffset_out = calculateStyleValue(
          currentHeight,
          sceneValue.stroke_effect_dashedoffset_out,
        );
        const pencel_rotate = calculateStyleValue(currentHeight, sceneValue.pencel_rotate);
        const pencel_bottom = calculateStyleValue(currentHeight, sceneValue.pencel_bottom);
        const pencel_right = calculateStyleValue(currentHeight, sceneValue.pencel_right);

        if (scrollRatio <= 0.2) {
          sceneElem.$messageA.style.opacity = `${message_a_opacity_in}`;
        } else {
          sceneElem.$messageA.style.opacity = `${message_a_opacity_out}`;
        }

        if (scrollRatio <= 0.4) {
          sceneElem.$pencelLogo.style.width = `${pencel_logo_width_fast}vw`;
          sceneElem.$pencelLogo.style.transform = `translate3d(${pencel_logo_translateX_slow}%, -50%, 0)`;
          sceneElem.$strokeEffect.style.strokeDashoffset = `${stroke_effect_dashedoffset_in}`;
        } else {
          sceneElem.$pencelLogo.style.width = `${pencel_logo_width_slow}vw`;
          sceneElem.$pencelLogo.style.transform = `translate3d(${pencel_logo_translateX_fast}%, -50%, 0)`;
          sceneElem.$strokeEffect.style.strokeDashoffset = `${stroke_effect_dashedoffset_out}`;
        }

        if (scrollRatio <= 0.6) {
          sceneElem.$messageB.style.opacity = `${message_b_opacity_in}`;
        } else {
          sceneElem.$messageB.style.opacity = `${message_b_opacity_out}`;
        }

        sceneElem.$pencelLogo.style.opacity = `${pencel_logo_opacity}`;
        sceneElem.$messageA.style.transform = `translate3d(0, ${message_a_translateY}%, 0)`;
        sceneElem.$pencel.style.transform = `rotate(${pencel_rotate}deg)`;
        sceneElem.$pencel.style.right = `${pencel_right}%`;
        sceneElem.$pencel.style.bottom = `${pencel_bottom}%`;

        break;

      case 1:
        const description_opacity = calculateStyleValue(
          currentHeight,
          sceneValue.description_opacity,
        );
        const description_translateY = calculateStyleValue(
          currentHeight,
          sceneValue.description_translateY,
        );

        sceneElem.$description.style.opacity = `${description_opacity}`;
        sceneElem.$description.style.transform = `translate3d(0, ${description_translateY}%, 0)`;
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
    window.addEventListener('scroll', scrollLoop);
  });
})();
