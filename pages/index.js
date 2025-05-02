import { Html, OrbitControls } from "@react-three/drei";
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { BoxGeometry, MeshBasicMaterial } from "three";
import { Model } from "@/components/model";
import QuestionPanel from "@/components/question-panel/question-panel";

const Index = () => {
  const [showQuestions, setShowQuestions] = useState(false);

  return (
    <div className="canvas-container">
      {/* {showQuestions && <QuestionPanel onClose={() => setShowQuestions(false)} />} */}
      <Canvas>
        <ambientLight />
        <directionalLight position={[5, 10, 5]} intensity={4} />

        <mesh position={[-1, 0, 0]}>
          <boxGeometry />
          <meshBasicMaterial color="orange" />
        </mesh>
        <Suspense fallback={null}>
          <Model onClick={() => setShowQuestions(true)} />
        </Suspense>
        <OrbitControls />
        {
          <Html position={[0.4, 3, 0]}>
            <div className="question-panel">
              <strong>Question:</strong> What's your name?
            </div>
          </Html>
        }
      </Canvas>
    </div>
  );
};

export default Index;
