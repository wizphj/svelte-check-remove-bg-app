<script>
  import { onMount } from "svelte";
  import { canvasToggle } from "@stores/store.js";
  export let file;
  let img;
  let canvas;
  let realPath;

  onMount(() => {
    startDownload();
  });

  function startDownload() {
    img = new Image();
    img.crossOrigin = "Anonymous";
    img.addEventListener("load", imageReceived, false);

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      img.src = reader.result;
      realPath = img.src;
    };
  }

  function imageReceived() {
    let ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    let imgData = ctx.getImageData(0, 0, img.width, img.height);
    let pixels = imgData.data;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i] != 255 && pixels[i + 1] != 255 && pixels[i + 2] != 255) {
        pixels[i] = 0;
        pixels[i + 1] = 0;
        pixels[i + 2] = 0;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }
</script>

<div class="container" id={file.name}>
  <div class="item-title">👇 {file.name}</div>
  <canvas
    bind:this={canvas}
    style="display: {$canvasToggle ? 'inline-block' : 'none'};"
  />
  <img src={realPath} alt={file.name} />
</div>

<style type="scss">
  div.container {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
  }
  div.item-title {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
    padding: 16px;
    margin-bottom: 48px;
    text-align: center;
    background-color: #f5f5f5;
  }
  img,
  canvas {
    margin: 0 16px 48px;
  }
</style>
