<script>
  import { gameState } from "./gameState.svelte";
</script>

<style>
  .full-screen {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .door {
    background-color: lightgrey;
    position: absolute;
    width: 50%;
    height: 100%;
    z-index: 1000;
    background-image: radial-gradient(circle, transparent 20%, grey 20%);
    background-repeat: repeat-y;
  }

  .door-left {
    background-position: right center;
    background-size: 10px 10px;
    top: 0;
    left: 0;
    transform: scaleX(-1);
    animation: slideInLeft 750ms forwards;
    z-index: 1000;
  }

  .door-left-open {
    background-position: right center;
    background-size: 10px 10px;
    top: 0;
    left: 0;
    animation: slideOutLeft 750ms forwards;
    z-index: 1000;
  }

  .door-right {
    background-position: left center;
    background-size: 10px 10px;
    top: 0;
    right: 0;
    animation: slideInRight 750ms forwards;
    z-index: 1000;
  }

  .door-right-open {
    background-position: left center;
    background-size: 10px 10px;
    top: 0;
    right: 0;
    animation: slideOutRight 750ms forwards;
    z-index: 1000;
  }

  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideOutLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
</style>

<div class="full-screen game-element" style="position: relative; z-index: 2; overflow:hidden;">
  <div class="door" class:door-left={gameState.closeDoorAnimation} class:door-left-open={!gameState.closeDoorAnimation}></div>
  <div class="door" class:door-right={gameState.closeDoorAnimation} class:door-right-open={!gameState.closeDoorAnimation}></div>
  <div>Send off</div>
</div>