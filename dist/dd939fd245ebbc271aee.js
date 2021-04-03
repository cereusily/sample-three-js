import"./style.css";import*as THREE from"three";import{OrbitControls}from"three/examples/jsm/controls/OrbitControls.js";import*as dat from"dat.gui";import{PointLight}from"three";const gui=new dat.GUI,textureLoader=new THREE.TextureLoader,normalTexture=textureLoader.load("/textures/NormalMap.png"),canvas=document.querySelector("canvas.webgl"),scene=new THREE.Scene,geometry=new THREE.SphereBufferGeometry(.5,64,64),material=new THREE.MeshStandardMaterial;material.metalness=.2,material.roughness=.7,material.normalMap=normalTexture,material.color=new THREE.Color(0);const sphere=new THREE.Mesh(geometry,material);scene.add(sphere);const light1=gui.addFolder("Light 1"),pointLight=new THREE.PointLight(57855,2);pointLight.position.set(2.8,-3,-2),pointLight.intensity=8.8,scene.add(pointLight),light1.add(pointLight.position,"x").min(-6).max(6).step(.01),light1.add(pointLight.position,"y").min(-3).max(3).step(.01),light1.add(pointLight.position,"z").min(-3).max(3).step(.01),light1.add(pointLight,"intensity").min(0).max(10).step(.1);const light2=gui.addFolder("Light 2"),pointLight2=new THREE.PointLight(16711680,2);pointLight2.position.set(-6,3,-1.1),pointLight2.intensity=9.9,scene.add(pointLight2),light2.add(pointLight2.position,"x").min(-6).max(6).step(.01),light2.add(pointLight2.position,"y").min(-3).max(3).step(.01),light2.add(pointLight2.position,"z").min(-3).max(3).step(.01),light2.add(pointLight2,"intensity").min(0).max(10).step(.1);const light2color={color:983040};light2.addColor(light2color,"color").onChange((()=>{pointLight2.color.set(light2color.color)}));const light3=gui.addFolder("Light 3"),pointLight3=new THREE.PointLight(16777215,.1);pointLight3.position.set(.27,.34,-.13),pointLight3.intensity=.9,scene.add(pointLight3),light3.add(pointLight3.position,"x").min(-6).max(6).step(.01),light3.add(pointLight3.position,"y").min(-3).max(3).step(.01),light3.add(pointLight3.position,"z").min(-3).max(3).step(.01),light3.add(pointLight3,"intensity").min(0).max(10).step(.1);const sizes={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",(()=>{sizes.width=window.innerWidth,sizes.height=window.innerHeight,camera.aspect=sizes.width/sizes.height,camera.updateProjectionMatrix(),renderer.setSize(sizes.width,sizes.height),renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))}));const camera=new THREE.PerspectiveCamera(75,sizes.width/sizes.height,.1,100);camera.position.x=0,camera.position.y=0,camera.position.z=2,scene.add(camera);const renderer=new THREE.WebGLRenderer({canvas,alpha:!0});renderer.setSize(sizes.width,sizes.height),renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),document.addEventListener("mousemove",onDocumentMouseMove);let mouseX=0,mouseY=0,targetX=0,targetY=0;const windowX=window.innerWidth/2,windowY=window.innerHeight/2;function onDocumentMouseMove(t){mouseX=t.clientX-windowX,mouseY=t.clientY-windowY}const updateSphere=t=>{sphere.position.y=.001*window.scrollY};window.addEventListener("scroll",updateSphere);const clock=new THREE.Clock,tick=()=>{targetX=.001*mouseX,targetY=.001*mouseY;const t=clock.getElapsedTime();sphere.rotation.y=.5*t,sphere.rotation.y+=.5*(targetX-sphere.rotation.y),sphere.rotation.x+=.05*(targetY-sphere.rotation.x),sphere.position.z+=-.05*(targetY-sphere.rotation.x),renderer.render(scene,camera),window.requestAnimationFrame(tick)};tick();