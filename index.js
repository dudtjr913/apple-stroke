(() => {
  const sceneInfo = [
    {
      type: 'sticky',
      scrollHeight: 0,
      heightNum: 5,
      elem: {
        $container: document.body.querySelector('#scene-1'),
        $pencelLogo: document.body.querySelector('.pencel-logo'),
        $messageA: document.body.querySelector('.main-message.a'),
        $messageB: document.body.querySelector('.main-message.b'),
        $pencel: document.body.querySelector('.pencel'),
        $strokeEffect: document.body.querySelector('stroke-effct-svg'),
      },
      value: {
        pencel_logo_opacity: [1, 0, {start: 0, end: 1}],
        pencel_logo_width: [1000, 50, {start: 0, end: 0.9}],
        message_a_opacity: [0, 1, {start: 0.2, end: 0.4}],
        message_a_translate3d: [20, -20, {start: 0.2, end: 0.4}],
        message_b_opacity: [0, 1, {start: 0.4, end: 0.6}],
        message_b_translate3d: [20, -20, {start: 0.4, end: 0.6}],
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
        $container: document.body.querySelector('#scene-2'),
        $description: document.body.querySelector('.description'),
      },
      value: {
        description_opacity: [0, 1, {start: 0, end: 0.1}],
        description_translate3d: [40, 0, {start: 0, end: 0.1}],
      },
    },
  ];

  const setSceneHeight = () => {
    sceneInfo.forEach((scene) => {
      if (scene.type === 'sticky') {
        scene.scrollHeight = scene.heightNum * window.innerHeight;
      } else {
        scene.scrollHeight = scene.elem.$container.offsetHeight * 1.5;
      }
      scene.elem.$container.style.height = `${scene.scrollHeight}px`;
    });
  };

  setSceneHeight();
})();
