<template>
  <div id="cesiumContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

let viewer; // Cesium Viewer 的引用

// 初始化 Cesium
const initCesium = () => {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZDYyM2IwZC04NzQwLTRhMDQtODdhOS1hODRhODJlYzA0NGEiLCJpZCI6MjYxNTY0LCJpYXQiOjE3MzM4ODc0OTF9.NnCJhlv-nMxNbB_MNKKPFzZ5tu2Kpy_uXng5zBWyOtE'; // 可选，设置 Cesium Ion Token
  viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrainAsync(), // 加载全球地形
    animation: false,
    timeline: false,
  });

  // 添加一个示例实体
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED,
    },
  });

  // 自动飞向添加的实体
  viewer.flyTo(viewer.entities);
};

// 挂载和卸载生命周期
onMounted(() => {
  initCesium();
});

onBeforeUnmount(() => {
  if (viewer) viewer.destroy(); // 销毁 Cesium Viewer
});
</script>
