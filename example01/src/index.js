import * as THREE from './../node_modules/three/build/three.module.js';
import {
  OrbitControls
} from './../node_modules/three/examples/jsm/controls/OrbitControls.js';

let renderer, camera, controller, scene, mesh

window.addEventListener('DOMContentLoaded', init);

/**
 * 初期化処理
 */
function init() {
  // *****************************************************
  // ** レンダラーの生成
  // *****************************************************
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x666666); // 空間全体の色
  document.body.appendChild(renderer.domElement); // レンダラー(Canvas)をDOMへ追加

  // *****************************************************
  // ** カメラの生成
  // *****************************************************
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight);
  camera.position.set(50, 60, 50); // 適当に位置調整(x,y,z)
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // *****************************************************
  // ** カメラコントローラーの生成
  // ** カメラをマウスで操作できるようになるコントローラ(公式から提供されている)
  // *****************************************************
  controller = new OrbitControls(camera, renderer.domElement);
  controller.enableDamping = true;
  controller.dampingFactor = 0.2;

  // *****************************************************
  // ** シーンの生成
  // *****************************************************
  scene = new THREE.Scene();

  // *****************************************************
  // ** 光源の追加(１つまたは、複数選択)
  // *****************************************************
  // 平行光源 (https://threejs.org/docs/#api/en/lights/DirectionalLight)
  const directLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directLight.position.set(0, 40, 40); // 適当に位置調整(x,y,z)
  scene.add(directLight);
  // *****************************************************
  // // スポットライト (https://threejs.org/docs/#api/en/lights/SpotLight)
  // const spotLight = new THREE.SpotLight(0xffffff, 1.0);
  // spotLight.position.set(0, 35, 0); // 適当に位置調整(x,y,z)
  // scene.add(spotLight);
  // *****************************************************
  // // 環境光源 (https://threejs.org/docs/#api/en/lights/AmbientLight)
  // const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  // scene.add(ambient);
  // *****************************************************

  // *****************************************************
  // ** オブジェクトの追加
  // *****************************************************
  const materialOptions = {
    color: 0x982323, // RGBで好きな色を指定
    side: THREE.DoubleSide
  };

  mesh = new THREE.Mesh(
    // ***************************************
    // *** 形状の選択(１つ選択) ***
    // new THREE.BoxGeometry(32, 32, 32),        // 直方体 (https://threejs.org/docs/#api/en/geometries/BoxGeometry)
    // new THREE.SphereGeometry(16, 64, 64),     // 球体 (https://threejs.org/docs/#api/en/geometries/SphereGeometry)
    // new THREE.PlaneGeometry(32, 32, 32, 32),  // 平面 (https://threejs.org/docs/#api/en/geometries/PlaneGeometry)
    // new THREE.ConeGeometry(16, 32, 64),       // 三角錐 (https://threejs.org/docs/#api/en/geometries/ConeGeometry)
    // new THREE.CylinderGeometry(8, 8, 32, 64), // 円柱 (https://threejs.org/docs/#api/en/geometries/CylinderGeometry)
    new THREE.TorusGeometry(16, 6, 64, 64), // ドーナッツ (https://threejs.org/docs/#api/en/geometries/TorusGeometry)
    // ***************************************

    // ***************************************
    // *** 材質の選択(１つ選択) ***
    new THREE.MeshStandardMaterial(materialOptions) // 光をちゃんと計算 (https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)
    // new THREE.MeshLambertMaterial(materialOptions)  // 光沢無し (https://threejs.org/docs/#api/en/materials/MeshLambertMaterial)
    // new THREE.MeshPhongMaterial(materialOptions)    // テッカテカ (https://threejs.org/docs/#api/en/materials/MeshPhongMaterial)
    // new THREE.MeshNormalMaterial(materialOptions)   // なんか虹色になるやつ (https://threejs.org/docs/#api/en/materials/MeshNormalMaterial)
    // new THREE.MeshToonMaterial(materialOptions)     // トゥーンシェーディングってやつ (https://threejs.org/docs/#api/en/materials/MeshToonMaterial)
    // new THREE.MeshBasicMaterial(materialOptions)    // 影なしベタ塗り (https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)
    // ***************************************
  );
  scene.add(mesh);

  // *****************************************************
  // ** イベントの初回実行
  // *****************************************************
  tick();
  onResize();
}

/**
 * 毎フレーム時に実行されるループイベント
 */
function tick() {
  // 生成したオブジェクトを回す
  mesh.rotation.y += 0.01;
  mesh.rotation.x += 0.01;

  controller.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

/**
 * ウインドウサイズ変更時のサイズ調整
 */
function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // レンダラーサイズ調整
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // カメラのアスペクト調整
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}