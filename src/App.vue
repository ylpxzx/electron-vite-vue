<template>
  <h1>🖥️ Hello World!</h1>
  <p>Welcome to your Electron application.</p>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <div>
      <RouterLink to="/">Go to Home</RouterLink>
    </div>
  </nav>
  <div style="margin-top: 20px; border: 1px solid grey; padding: 20px; border-radius: 10px;">
    <!-- 该处得加入keep-alive，否则切换路由时会重新渲染组件，导致消息端口监听器失效 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>