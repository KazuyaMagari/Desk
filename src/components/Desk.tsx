import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function Desk() {
  const modelRef = useRef<THREE.Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
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
        scene.add(model);
        setIsLoading(false);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error: unknown) => {
        console.error("GLBの読み込み中にエラーが発生しました", error);
        setIsLoading(false);
      }
    );
    camera.position.set(10, 10, 8);

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
    window.addEventListener("click", onMouseMove);

    function onMouseMove(event: MouseEvent) {
      raycaster.setFromCamera(pointer, camera);
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      const intersects = raycaster.intersectObjects(scene.children);
      const selectedObject = intersects[0]?.object;
      const color = new THREE.Color(0xff0000);
      if (selectedObject instanceof THREE.Mesh) {
        selectedObject.material.color.set(color);
      }
      console.log(intersects);

      renderer.render(scene, camera);
    }

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
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
    </>
  );
}

export default Desk;
