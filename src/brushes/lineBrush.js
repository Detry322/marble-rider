/* globals AFRAME THREE */
AFRAME.registerBrush('line-brush',
  {
    init: function (color, width) {
      this.material = new THREE.MeshStandardMaterial({
        color: this.data.color,
        roughness: 0.6,
        metalness: 0.2,
        side: THREE.FrontSide,
        shading: THREE.SmoothShading
      });
      this.geometry = new THREE.CubeGeometry(0.1, 0.1, 1);
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.object3D.add(this.mesh);
      this.mesh.visible = false
    },
    addPoint: function (position, orientation, pointerPosition, pressure, timestamp) {
      if (!this.firstPoint) {
        this.firstPoint = pointerPosition.clone();
        this.mesh.position.set(this.firstPoint.x, this.firstPoint.y, this.firstPoint.z)
      }
      this.mesh.visible = true
      var distance = this.firstPoint.distanceTo(pointerPosition);
      this.mesh.scale.set(1, 1, distance);
      this.mesh.position.x = (this.firstPoint.x + pointerPosition.x)/2;
      this.mesh.position.y = (this.firstPoint.y + pointerPosition.y)/2;
      this.mesh.position.z = (this.firstPoint.z + pointerPosition.z)/2;
      this.mesh.lookAt(pointerPosition)
      return true;
    },
    finishStroke: function() {
      this.entity.setAttribute('position', {x: this.mesh.position.x, y: this.mesh.position.y, z: this.mesh.position.z});
      this.mesh.position.set(0, 0, 0);
      rotation = {
        x: 0,
        y: 0,
        z: THREE.Math.radToDeg(this.mesh.rotation.z)
      }
      this.entity.setAttribute('rotation', rotation);
      console.log(rotation);
      this.mesh.rotation.set(0, 0, 0);
      this.entity.setAttribute('static-body', '');
    }
  },
  {thumbnail: 'brushes/thumb_stamp_squares.gif', spacing: 0.01}
);
