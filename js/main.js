			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight,1, 10000 );
			camera.position.set (0, 200, 400);
		
			const renderer = new THREE.WebGLRenderer({alpha:true});
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.setClearColor(0xffffff, 0);
			renderer.setPixelRatio(window.devicePixelRatio);
			document.body.appendChild( renderer.domElement );

			const light = new THREE.DirectionalLight(0xCFE2F3);
			light.position.set(60, 0, 30);
			scene.add(light);

			const loader = new THREE.TextureLoader();

			var texture = loader.load('img/earth/clouds.png');
			var geometry = new THREE.SphereGeometry(3.005, 60, 60)
			var material = new THREE.MeshLambertMaterial({
				map: texture,
				side: THREE.DoubleSide,
				bumpMap: texture,
				opacity: .2,
				transparent: true,
				emissive: (new THREE.Color(0xff0000), new THREE.Color(0xFFFFFF)),
			});
			var cloudMesh = new THREE.Mesh(geometry, material)
			scene.add(cloudMesh)


			var texture = loader.load('img/earth/map.jpg');
			var bumpMap = loader.load('img/earth/map.jpg');
			//var lights = loader.load('img/earth/mig.png');
	

			var geometry = new THREE.SphereGeometry(3, 60, 60);
			var material = new THREE.MeshPhongMaterial({
				map: texture,
				bumpMap: bumpMap,
				bumpScale: 0.02,
	
				//emissive: (new THREE.Color(0xFFFFFF), new THREE.Color(0xE7E896)),
				//emissiveMap: lights,
			
			});
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(0, 0, 0);
			scene.add(mesh);

			var customMaterial = new THREE.ShaderMaterial(
				{
					uniforms: {},
					vertexShader: document.getElementById('vertexShader').textContent,
					fragmentShader: document.getElementById('fragmentShader').textContent,
					side: THREE.BackSide,
					blending: THREE.AdditiveBlending,
					transparent: true
		
				});
			var ballGeometry = new THREE.SphereGeometry(5, 60, 60);
			var ball = new THREE.Mesh(ballGeometry, customMaterial);
			scene.add(ball);
		
			camera.position.z = 4;
			camera.position.y = 1.8;

			document.addEventListener('mousemove', onDocumentMouseMove);

			let mouseX = 0;
			let mouseY = 0;

			let targetX = 0;
			let targetY = 0;
			const windowX = window.innerWidth / 2;
			const windowY = window.innerHeight / 2;

			function onDocumentMouseMove(event){
				mouseX = (event.clientX - windowX);
				mouseY = (event.clientY - windowY);
			}
	

			const animate = function () {
				requestAnimationFrame( animate );

				cloudMesh.rotation.y += 0.00150;
				mesh.rotation.y += 0.001 ;
			
				targetX = mouseX * .001;
				targetY = mouseY * .001;

				mesh.rotation.y += 0.002 * (targetY  - mesh.rotation.y);
				cloudMesh.rotation.y += 0.002 * (targetY  - mesh.rotation.y);

				mesh.rotation.x += 0.002 * (targetX  - mesh.rotation.x);
				cloudMesh.rotation.x += 0.002 * (targetX  - mesh.rotation.x);

				mesh.rotation.z += 0.002 * (targetX  - mesh.rotation.z);
				cloudMesh.rotation.z += 0.002 * (targetX  - mesh.rotation.z);
			
				renderer.render( scene, camera );
			};

			animate();
			