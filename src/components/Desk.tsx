import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import AboutMeModal from "./AboutMeModal";
import MyWorksModal from "./MyWorksModal";

const gitHubURL = "https://github.com/KazuyaMagari";
const faceBookURL = "https://www.facebook.com/profile.php?id=100080312090230";
function Desk() {
  const modelRef = useRef<THREE.Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const [modelPosition, setModelPosition] = useState({ y: -10, x: 5 });
  const [isAboutMeModalOpen, setIsAboutMeModalOpen] = useState(false);
  const [isMyWorksModalOpen, setIsMyWorksModalOpen] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const handleClick = (event: MouseEvent) => {
    if (!cameraRef.current || !sceneRef.current) return;

    // クリック座標の正規化
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // レイキャスターの設定
    raycaster.setFromCamera(pointer, cameraRef.current);

    // デバッグ用のログ
    console.log("Click coordinates:", pointer.x, pointer.y);

    // シーン内のすべてのオブジェクトを検索
    const intersects = raycaster.intersectObjects(
      sceneRef.current.children,
      true
    );

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      console.log("Clicked object:", clickedObject.name);

      // クリックされたオブジェクトに基づいて処理を実行
      if (
        clickedObject.name === "Object_5" ||
        clickedObject.name === "Object_4"
      ) {
        window.open(gitHubURL, "_blank");
      } else if (
        clickedObject.name === "Object_4002" ||
        clickedObject.name === "Object_5002"
      ) {
        window.open(faceBookURL, "_blank");
      } else if (
        clickedObject.name === "Object_10002" ||
        clickedObject.name === "Text003"
      ) {
        setIsAboutMeModalOpen(true);
      } else if (
        clickedObject.name === "Object_10003" ||
        clickedObject.name === "Text004"
      ) {
        setIsMyWorksModalOpen(true);
      }
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.set(8, 10, 10);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
    });
    renderer.setClearColor(0x2e008f);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 8);
    directionalLight.position.set(4, 20, 4);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      "/desk.glb",
      (gltf: GLTF) => {
        const model = gltf.scene;
        modelRef.current = model;
        model.position.y = modelPosition.y;
        model.position.x = modelPosition.x;
        scene.add(model);
        setIsLoading(false);
      },
      (_xhr) => {
        // Progress callback - no console log needed
      },
      (error: unknown) => {
        console.error("GLBの読み込み中にエラーが発生しました", error);
        setIsLoading(false);
      }
    );

    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // X軸と下方向のY軸の回転のみ許可
    controls.minPolarAngle = Math.PI / 2 - Math.PI / 6; // 60度
    controls.maxPolarAngle = Math.PI / 2; // 90度

    // ズームの制限
    controls.maxDistance = 8;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    const canvas = canvasRef.current;
    canvas.addEventListener("click", handleClick);

    const animate = () => {
      controls.update();
      if (modelRef.current) {
        if (modelRef.current.position.y < 0) {
          modelRef.current.position.y += 0.1;
        }
        if (modelRef.current.position.x > 0) {
          modelRef.current.position.x -= 0.1;
        }
        setModelPosition({
          y: modelRef.current.position.y,
          x: modelRef.current.position.x,
        });
      }
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", handleClick);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100vw",
          height: "100vh",
          background: "white",
          position: "fixed",
          top: 0,
          left: 0,
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
      />
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            fontSize: "24px",
            zIndex: 1000,
          }}
        >
          Loading...
        </div>
      )}
      <AboutMeModal
        isOpen={isAboutMeModalOpen}
        onClose={() => setIsAboutMeModalOpen(false)}
      />
      <MyWorksModal
        isOpen={isMyWorksModalOpen}
        onClose={() => setIsMyWorksModalOpen(false)}
      />
    </>
  );
}

export default Desk;
