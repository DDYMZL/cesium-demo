<template>
  <div id="cesiumContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import proj4 from 'proj4';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import {MOCK_A} from '../../constants/mock.ts'

let viewer; // Cesium Viewer 的引用

// 定义 EPSG:4547 坐标系
proj4.defs(
  'EPSG:4547',
  '+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs'
);

// 初始化 Cesium
const initCesium = () => {
  

  viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://10.200.6.20/arcgis/rest/services/SZSW_TYFW/Basemap_dem_SS/MapServer/tile/{z}/{y}/{x}',
      layer: 'SZSW_TYFW',
      style: 'default',
      tileMatrixSetID: 'EPSG:4326',
    }),
  });

  // 将 CGCS2000 坐标转换为 WGS84 坐标
  const coordsWGS84 = MOCK_A.flat().map(([x, y]) => {
    const [lon, lat] = proj4('EPSG:4547', 'EPSG:4326', [x, y]);  // 转换坐标
    return [lon, lat];
  });

  
  // 将 WGS84 坐标转换为 Cesium 的 Cartesian3 坐标系
  const positions = Cesium.Cartesian3.fromDegreesArray(coordsWGS84.flat());

  // 创建面（Polygon）
  const polygonEntity = viewer.entities.add({
    polygon: {
      hierarchy: positions,
      material: Cesium.Color.RED.withAlpha(0.1),  // 面的填充颜色及透明度
      outline: true,                             // 是否显示边界
      outlineColor: Cesium.Color.BLACK,          // 边界颜色
      outlineWidth: 2,                           // 边界宽度
    },
  });

  // 设置视图中心
  viewer.scene.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(114.04090249630015, 22.5174640541771, 1000),
  });
};

// 挂载和卸载生命周期
onMounted(() => {
  initCesium();
});

onBeforeUnmount(() => {
  if (viewer) viewer.destroy(); // 销毁 Cesium Viewer
});
</script>
