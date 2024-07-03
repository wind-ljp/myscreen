import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader';
import * as THREE from 'three';


export default function ThreeBase() {
  let scene, camera, controls, renderer;
  useEffect(() => {
    threeStart();
  }, []);

  const initThree = () => {
    const width = document.getElementById('threeMain').clientWidth;
    const height = document.getElementById('threeMain').clientHeight;
    renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(width, height);
    document.getElementById('threeMain').appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);
  };

  const initCamera = () => {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(26, - 40, 5);
  };

  const initScene = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfd1e5);
  };

  const initLight = () => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
    directionalLight.position.set(0, 0, 2);
    scene.add(directionalLight);
  };

  const initObject = () => {
    THREE.Object3D.DEFAULT_UP.set(0, 0, 1);
    const loader = new Rhino3dmLoader();
    loader.setLibraryPath('libs/rhino3dm/');
    loader.load('rhino.3dm', function (object) {
      scene.add(object);
    },
      function (xhr) { },
      function (error) {
        console.log('3dm模型加载异常', error);
      });
  };

  function initControl() {
    controls = new OrbitControls(camera, renderer.domElement);
  }

  function threeStart() {
    const width = document.getElementById('threeMain').clientWidth;
    const height = document.getElementById('threeMain').clientHeight;
    initThree();
    initCamera(width, height);
    initScene();
    initLight();
    initControl();
    initObject();
    animation();
  }
  function animation() {
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  }
  return (
    <div id="threeMain" style={{ width: '100%', height: '100vh' }} />
  );
}