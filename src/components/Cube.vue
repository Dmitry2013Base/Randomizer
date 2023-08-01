<template>
    <div :class="cubeClasses">
        <div class="side one"></div>
        <div class="side two"></div>
        <div class="side three"></div>
        <div class="side four"></div>
        <div class="side five"></div>
        <div class="side six"></div>
    </div>
</template>
  
<script>
    export default {
        data() {
            return {
                cubeClasses: [ 'cube' ],
                results: [
                    { x: 0, y: 0, z: -1 },
                    { x: -1, y: 90, z: 0 },
                    { x: -1, y: 90, z: 90 },
                    { x: -1, y: 270, z: 90 },
                    { x: -1, y: 270, z: 0 },
                    { x: 0, y: 180, z: -1 },
                ],
                selectItem: null,
                ItemLastPosition: { x: 0, y: 0, z: 0 },
                ItemNextPosition: { x: 0, y: 0, z: 0 },
                isRatio: false,
            };
        },
        props: {
            timeAnimation: {
                type: Number,
                required: true
            }
        },
        mounted() {
            this.cast();
        },
        methods: {
           cast() {
                let index = Math.floor(Math.random() * this.results.length);
                this.selectItem = this.results[index];
                this.ItemLastPosition = this.ItemNextPosition;
                this.setNextPosition();
                this.cubeClasses.push('cube-rotate');

                setTimeout(() => {
                    this.cubeClasses.length = 0;
                    this.cubeClasses.push('cube');
                }, this.timeAnimation * 1000)
            },
            setNextPosition() {
                const angles = [ 0, 90, 180, 270 ];
                var item = this.selectItem;
                var angle = angles[Math.floor(Math.random() * angles.length)];
                var ratio = (this.isRatio) ? 360 : -360;

                this.ItemNextPosition = {
                    x: `${(item.x === -1) ? angle + ratio / 2 : item.x + ratio}deg`,
                    y: `${(item.y === -1) ? angle + ratio / 2 : item.y + ratio}deg`,
                    z: `${(item.z === -1) ? angle + ratio / 2 : item.z + ratio}deg`,
                };
                this.isRatio = !this.isRatio;
            }
        }
    }   
</script>

<style lang="scss" scoped> 
    $size: 50px;
    $translate: $size * 0.5;
    $shadow: $size * 0.25;

    .cube {
        position: relative;
        width: $size;
        height: $size;
        transform-style: preserve-3d;
    }

    .cube {
        transform: rotateY(v-bind('ItemNextPosition.y')) rotateX(v-bind('ItemNextPosition.x')) rotateZ(v-bind('ItemNextPosition.z'));
    }

    .cube-rotate {
        animation: rotate v-bind('timeAnimation + "s"') ease-out;
    }

    @keyframes rotate {
        0% {
            transform: rotateY(v-bind('ItemLastPosition.y')) rotateX(v-bind('ItemLastPosition.x')) rotateZ(v-bind('ItemLastPosition.z'));
        }
        100% {
            transform: rotateY(v-bind('ItemNextPosition.y')) rotateX(v-bind('ItemNextPosition.x')) rotateZ(v-bind('ItemNextPosition.z'));
        }
    }

    .side {
        width: 100%;
        height: 100%;
        background: white;
        outline: 2px solid black;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .side {
        &:before {
            content: '';
            width: 20%;
            height: 20%;
            background: black;
            border-radius: 50%;
        }
    }

    .one {
        transform: translateZ($translate);
    }

    .two {
        &:before {
            background: transparent;
            box-shadow: #000 #{-$shadow} #{-$shadow} 0px 0px, #000 #{$shadow} #{$shadow} 0px 0px;
        }
        transform: translateX(-$translate) rotateY(-90deg);
    }

    .three {
        &:before {
            box-shadow: #000 #{-$shadow} #{$shadow} 0px 0px, #000 #{$shadow} #{-$shadow} 0px 0px;
        }
        transform: translateY($translate) rotateX(90deg);
    }

    .four {
        &:before {
            background: transparent;
            box-shadow: #000 #{-$shadow} #{$shadow} 0px 0px, #000 #{-$shadow} #{-$shadow} 0px 0px, #000 #{$shadow} #{$shadow} 0px 0px, #000 #{$shadow} #{-$shadow} 0px 0px;
        }
        transform: translateY(-$translate) rotateX(90deg);
    }

    .five {
        &:before {
            box-shadow: #000 #{-$shadow} #{-$shadow} 0px 0px, #000 #{-$shadow} #{$shadow} 0px 0px, #000 #{$shadow} #{-$shadow} 0px 0px, #000 #{$shadow} #{$shadow} 0px 0px;
        }
        transform: translateX($translate) rotateY(90deg);
    }

    .six {
        &:before {
            background: transparent;
            box-shadow: #000 #{-$shadow} #{-$shadow} 0px 0px, #000 #{-$shadow} 0px 0px 0px, #000 #{-$shadow} #{$shadow} 0px 0px, #000 #{$shadow} #{-$shadow} 0px 0px, #000 #{$shadow} 0px 0px 0px, #000 #{$shadow} #{$shadow} 0px 0px;
        }
        transform: translateZ(-$translate);
    }
</style>
  