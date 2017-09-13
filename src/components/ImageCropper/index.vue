<template>
    <div class="vue-image-crop-upload" v-show="show">
        <div class="vicp-wrap">
            <div class="vicp-close" @click="off">
                <i class="vicp-icon4"></i>
            </div>

            <div class="vicp-step1" v-show="step == 1">
                <div class="vicp-drop-area"
                     @dragleave="preventDefault"
                     @dragover="preventDefault"
                     @dragenter="preventDefault"
                     @click="handleClick"
                     @drop="handleChange">
                    <i class="vicp-icon1" v-show="loading != 1">
                        <i class="vicp-icon1-arrow"></i>
                        <i class="vicp-icon1-body"></i>
                        <i class="vicp-icon1-bottom"></i>
                    </i>
                    <span class="vicp-hint" v-show="loading !== 1">{{ lang.hint }}</span>
                    <span class="vicp-no-supported-hint" v-show="!isSupported">{{ lang.noSupported }}</span>
                    <input type="file" v-show="false" @change="handleChange" ref="fileinput">
                </div>
                <div class="vicp-error" v-show="hasError">
                    <i class="vicp-icon2"></i> {{ errorMsg }}
                </div>
                <div class="vicp-operate">
                    <a @click="off" @mousedown="ripple">{{ lang.btn.off }}</a>
                </div>
            </div>

            <div class="vicp-step2" v-if="step == 2">
                <div class="vicp-crop">
                    <div class="vicp-crop-left" v-show="true">
                        <div class="vicp-img-container">
                            <img :src="sourceImgUrl"
                                 :style="sourceImgStyle"
                                 class="vicp-img"
                                 draggable="false"
                                 @drag="preventDefault"
                                 @dragstart="preventDefault"
                                 @dragend="preventDefault"
                                 @dragleave="preventDefault"
                                 @dragover="preventDefault"
                                 @dragenter="preventDefault"
                                 @drop="preventDefault"
                                 @mousedown="imgStartMove"
                                 @mousemove="imgMove"
                                 @mouseup="createImg"
                                 @mouseout="createImg"
                                 ref="img">
                            <div class="vicp-img-shade vicp-img-shade-1" :style="sourceImgShadeStyle"></div>
                            <div class="vicp-img-shade vicp-img-shade-2" :style="sourceImgShadeStyle"></div>
                        </div>
                        <div class="vicp-range">
                            <input type="range" :value="scale.range" step="1" min="0" max="100" @change="zoomChange">
                            <i @mousedown="startZoomSub" @mouseout="endZoomSub" @mouseup="endZoomSub"
                               class="vicp-icon5"></i>
                            <i @mousedown="startZoomAdd" @mouseout="endZoomAdd" @mouseup="endZoomAdd"
                               class="vicp-icon6"></i>
                        </div>
                    </div>
                    <div class="vicp-crop-right" v-show="true">
                        <div class="vicp-preview">
                            <div class="vicp-preview-item">
                                <img :src="createImgUrl" :style="previewStyle">
                                <span>{{ lang.preview }}</span>
                            </div>
                            <div class="vicp-preview-item">
                                <img :src="createImgUrl" :style="previewStyle" v-if="!noCircle">
                                <span>{{ lang.preview }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vicp-operate">
                    <a @click="setStep(1)" @mousedown="ripple">{{ lang.btn.back }}</a>
                    <a class="vicp-operate-btn" @click="upload" @mousedown="ripple">{{ lang.btn.save }}</a>
                </div>
            </div>

            <div class="vicp-step3" v-if="step == 3">
                <div class="vicp-upload">
                    <span class="vicp-loading" v-show="loading === 1">{{ lang.loading }}</span>
                    <div class="vicp-progress-wrap">
                        <span class="vicp-progress" v-show="loading === 1" :style="progressStyle"></span>
                    </div>
                    <div class="vicp-error" v-show="hasError">
                        <i class="vicp-icon2"></i> {{ errorMsg }}
                    </div>
                    <div class="vicp-success" v-show="loading === 2">
                        <i class="vicp-icon3"></i> {{ lang.success }}
                    </div>
                </div>
                <div class="vicp-operate">
                    <a @click="setStep(2)" @mousedown="ripple">{{ lang.btn.back }}</a>
                    <a @click="off" @mousedown="ripple">{{ lang.btn.close }}</a>
                </div>
            </div>
            <canvas v-show="false" :width="width" :height="height" ref="canvas"></canvas>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import {effectRipple, data2blob} from './utils';
    import fetch from 'utils/fetch';
    import langBag from './lang';
    const mimes = {
        'jpg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'psd': 'image/photoshop'
    };

    export default {
        props: {
            // 도메인, 파일 이름 업로드, 트리거 이벤트 가져 오기 (페이지가 여러 장의 사진 업로드 컨트롤 인 경우 구분할 수 있음)
            field: {
                type: String,
                default: 'avatar'
            },
            // 주소 업로드
            url: {
                type: String,
                default: ''
            },
            // 다른 하나는 데이터, 객체 형식에 첨부 된 파일을 업로드하는 것입니다.
            params: {
                type: Object,
                default: null
            },
            // 그림의 너비를 자른다.
            width: {
                type: Number,
                default: 200
            },
            // 그림 높이 잘라 내기
            height: {
                type: Number,
                default: 200
            },
            // 원형 이미지를 미리 보지 마십시오.
            noCircle: {
                type: Boolean,
                default: false
            },
            // 단일 파일 크기 제한
            maxSize: {
                type: Number,
                default: 10240
            },
            // 언어 유형
            langType: {
                type: String,
                'default': 'zh'
            },

        },
        data() {
            let that = this,
                    {
                            langType,
                            width,
                            height
                    } = that,
                    isSupported = true,
                    lang = langBag[langType] ? langBag[langType] : lang['zh'];

            if (typeof FormData != 'function') {
                isSupported = false;
            }
            return {
                show: true,
                // 마임 그림
                mime:mimes['jpg'],
                // 언어 팩
                lang,
                // 브라우저가 컨트롤을 지원하는지 여부
                isSupported,
                // 단계
                step: 1, //1 파일 선택 2 컷 3 업로드
                // 상태 및 진행 상황 업로드
                loading: 0, //0은 시작되지 않습니다 1 정체 2 성공 3 오류
                progress: 0,
                // 오류 및 오류 메시지의 유무
                hasError: false,
                errorMsg: '',
                // 수요 그래프 종횡비
                ratio: width / height,
                // 원래지도 주소, 그림 주소를 생성합니다.
                sourceImg: null,
                sourceImgUrl: '',
                createImgUrl: '',
                // 원본 이미지 이벤트 초기 값 드래그
                sourceImgMouseDown: {
                    on: false,
                    mX: 0, //마우스가 좌표를 누른다.
                    mY: 0,
                    x: 0, //scale원래 좌표
                    y: 0
                },
                // 이미지 미리보기의 컨테이너 크기를 생성합니다.
                previewContainer: {
                    width: 100,
                    height: 100
                },
                // 원래 컨테이너의 높이와 높이
                sourceImgContainer: { // sic
                    width: 240,
                    height: 180
                },
                // 원래 표시 속성
                scale: {
                    zoomAddOn: false, //버튼 줌 이벤트가 켜짐
                    zoomSubOn: false, //버튼 줌 이벤트가 켜짐
                    range: 1, //최대100
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    maxWidth: 0,
                    maxHeight: 0,
                    minWidth: 0, //가장 넓은
                    minHeight: 0,
                    naturalWidth: 0, //원래 너비
                    naturalHeight: 0
                }
            }
        },
        computed: {
            // 진행 스타일
            progressStyle() {
                let {
                        progress
                } = this;
                return {
                    width: progress + '%'
                }
            },
            // 원본 패턴
            sourceImgStyle() {
                let {
                        scale,
                        sourceImgMasking
                } = this;
                return {
                    top: scale.y + sourceImgMasking.y + 'px',
                    left: scale.x + sourceImgMasking.x + 'px',
                    width: scale.width + 'px',
                    height: scale.height + 'px'
                }
            },
            // 원래 마스크 속성
            sourceImgMasking() {
                let {
                                width,
                                height,
                                ratio,
                                sourceImgContainer
                        } = this,
                        sic = sourceImgContainer,
                        sicRatio = sic.width / sic.height, // 원본 컨테이너 종횡비
                        x = 0,
                        y = 0,
                        w = sic.width,
                        h = sic.height,
                        scale = 1;
                if (ratio < sicRatio) {
                    scale = sic.height / height;
                    w = sic.height * ratio;
                    x = (sic.width - w) / 2;
                }
                if (ratio > sicRatio) {
                    scale = sic.width / width;
                    h = sic.width / ratio;
                    y = (sic.height - h) / 2;
                }
                return {
                    scale, // 마스크는 수요에 비례하여 확장됩니다.
                    x,
                    y,
                    width: w,
                    height: h
                };
            },
            // 원래 마스크 스타일
            sourceImgShadeStyle() {
                let sic = this.sourceImgContainer,
                        sim = this.sourceImgMasking,
                        w = sim.width == sic.width ? sim.width : (sic.width - sim.width) / 2,
                        h = sim.height == sic.height ? sim.height : (sic.height - sim.height) / 2;
                return {
                    width: w + 'px',
                    height: h + 'px'
                };
            },
            previewStyle() {
                let {
                                width,
                                height,
                                ratio,
                                previewContainer
                        } = this,
                        pc = previewContainer,
                        w = pc.width,
                        h = pc.height,
                        pcRatio = w / h;
                if (ratio < pcRatio) {
                    w = pc.height * ratio;
                }
                if (ratio > pcRatio) {
                    h = pc.width / ratio;
                }
                return {
                    width: w + 'px',
                    height: h + 'px'
                };
            }
        },
        methods: {
            // 잔물결 효과를 클릭하십시오.
            ripple(e) {
                effectRipple(e);
            },
            // 컨트롤 닫기
            off() {
                this.show = false;
                this.$emit('close');
            },
            // 단계 설정
            setStep(step) {
                let that = this;
                setTimeout(function () {
                    that.step = step;
                }, 200);
            },
            /* 이미지 선택 영역 함수 바인딩
             ---------------------------------------------------------------*/
            preventDefault(e) {
                e.preventDefault();
                return false;
            },
            handleClick(e) {
                if (this.loading !== 1) {
                    if (e.target !== this.$refs.fileinput) {
                        e.preventDefault();
                        if (document.activeElement !== this.$refs) {
                            this.$refs.fileinput.click();
                        }
                    }
                }
            },
            handleChange(e) {
                e.preventDefault();
                if (this.loading !== 1) {
                    let files = e.target.files || e.dataTransfer.files;
                    this.reset();
                    if (this.checkFile(files[0])) {
                        this.setSourceImg(files[0]);
                    }
                }
            },
            /* ---------------------------------------------------------------*/
            // 선택한 파일이 적절한 지 확인하십시오.
            checkFile(file) {
                let that = this,
                        {
                                lang,
                                maxSize
                        } = that;
                // 이미지 전용
                if (file.type.indexOf('image') === -1) {
                    that.hasError = true;
                    that.errorMsg = lang.error.onlyImg;
                    return false;
                }
                this.mime=file.type;
                // 크기 너머
                if (file.size / 1024 > maxSize) {
                    that.hasError = true;
                    that.errorMsg = lang.error.outOfSize + maxSize + 'kb';
                    return false;
                }
                return true;
            },
            // 컨트롤 재설정
            reset() {
                let that = this;
                that.step = 1;
                that.loading = 0;
                that.hasError = false;
                that.errorMsg = '';
                that.progress = 0;
            },
            // 이미지 소스 설정
            setSourceImg(file) {
                let that = this,
                        fr = new FileReader();
                fr.onload = function (e) {
                    that.sourceImgUrl = fr.result;
                    that.startCrop();
                };
                fr.readAsDataURL(file);
            },
            // 절단 전 작업 준비
            startCrop() {
                let that = this,
                        {
                                width,
                                height,
                                ratio,
                                scale,
                                sourceImgUrl,
                                sourceImgMasking,
                                lang
                        } = that,
                        sim = sourceImgMasking,
                        img = new Image();
                img.src = sourceImgUrl;
                img.onload = function () {
                    let nWidth = img.naturalWidth,
                            nHeight = img.naturalHeight,
                            nRatio = nWidth / nHeight,
                            w = sim.width,
                            h = sim.height,
                            x = 0,
                            y = 0;
                    // 이미지 픽셀은 표준에 맞지 않습니다.
//                    if (nWidth < width || nHeight < height) {
//                        that.hasError = true;
//                        that.errorMsg = lang.error.lowestPx + width + '*' + height;
//                        return false;
//                    }
                    if (ratio > nRatio) {
                        h = w / nRatio;
                        y = (sim.height - h) / 2;
                    }
                    if (ratio < nRatio) {
                        w = h * nRatio;
                        x = (sim.width - w) / 2;
                    }
                    scale.range = 0;
                    scale.x = x;
                    scale.y = y;
                    scale.width = w;
                    scale.height = h;
                    scale.minWidth = w;
                    scale.minHeight = h;
                    scale.maxWidth = nWidth * sim.scale;
                    scale.maxHeight = nHeight * sim.scale;
                    scale.naturalWidth = nWidth;
                    scale.naturalHeight = nHeight;
                    that.sourceImg = img;
                    that.createImg();
                    that.setStep(2);
                };
            },
            // 마우스가 움직일 준비가 된 그림을 누른다.
            imgStartMove(e) {
                let {
                                sourceImgMouseDown,
                                scale
                        } = this,
                        simd = sourceImgMouseDown;
                simd.mX = e.screenX;
                simd.mY = e.screenY;
                simd.x = scale.x;
                simd.y = scale.y;
                simd.on = true;
            },
            // 마우스를 아래로 움직여 사진을 이동하십시오.
            imgMove(e) {
                let {
                                sourceImgMouseDown: {
                                        on,
                                        mX,
                                        mY,
                                        x,
                                        y
                                },
                                scale,
                                sourceImgMasking
                        } = this,
                        sim = sourceImgMasking,
                        nX = e.screenX,
                        nY = e.screenY,
                        dX = nX - mX,
                        dY = nY - mY,
                        rX = x + dX,
                        rY = y + dY;
                if (!on) return;
                if (rX > 0) {
                    rX = 0;
                }
                if (rY > 0) {
                    rY = 0;
                }
                if (rX < sim.width - scale.width) {
                    rX = sim.width - scale.width;
                }
                if (rY < sim.height - scale.height) {
                    rY = sim.height - scale.height;
                }
                scale.x = rX;
                scale.y = rY;
            },
            // 줌을 시작하려면 버튼을 누르십시오.
            startZoomAdd(e) {
                let that = this,
                        {
                                scale
                        } = that;
                scale.zoomAddOn = true;
                function zoom() {
                    if (scale.zoomAddOn) {
                        let range = scale.range >= 100 ? 100 : ++scale.range;
                        that.zoomImg(range);
                        setTimeout(function () {
                            zoom();
                        }, 60);
                    }
                }

                zoom();
            },
            // 해제 또는 제거 할 버튼
            endZoomAdd(e) {
                this.scale.zoomAddOn = false;
            },
            //버튼을 누르면 축소되기 시작합니다.
            startZoomSub(e) {
                let that = this,
                        {
                                scale
                        } = that;
                scale.zoomSubOn = true;
                function zoom() {
                    if (scale.zoomSubOn) {
                        let range = scale.range <= 0 ? 0 : --scale.range;
                        that.zoomImg(range);
                        setTimeout(function () {
                            zoom();
                        }, 60);
                    }
                }

                zoom();
            },
            // 취소하려면 단추를 놓거나 제거하십시오.
            endZoomSub(e) {
                let {
                        scale
                } = this;
                scale.zoomSubOn = false;
            },
            zoomChange(e) {
                this.zoomImg(e.target.value);
            },
            // 원본 이미지 확대 / 축소
            zoomImg(newRange) {
                let that = this,
                        {
                                sourceImgMasking,
                                sourceImgMouseDown,
                                scale
                        } = this,
                        {
                                maxWidth,
                                maxHeight,
                                minWidth,
                                minHeight,
                                width,
                                height,
                                x,
                                y,
                                range
                        } = scale,
                        sim = sourceImgMasking,
                        // 마스크 너비와 높이
                        sWidth = sim.width,
                        sHeight = sim.height,
                        // 새로운 너비와 높이
                        nWidth = minWidth + (maxWidth - minWidth) * newRange / 100,
                        nHeight = minHeight + (maxHeight - minHeight) * newRange / 100,
                        // 새 좌표 (마스크 중심점 줌에 따름)
                        nX = sWidth / 2 - (nWidth / width) * (sWidth / 2 - x),
                        nY = sHeight / 2 - (nHeight / height) * (sHeight / 2 - y);
                // 새 좌표가 마스크 한계를 초과하는지 확인하십시오.
                if (nX > 0) {
                    nX = 0;
                }
                if (nY > 0) {
                    nY = 0;
                }
                if (nX < sWidth - nWidth) {
                    nX = sWidth - nWidth;
                }
                if (nY < sHeight - nHeight) {
                    nY = sHeight - nHeight;
                }
                // 배정 처리
                scale.x = nX;
                scale.y = nY;
                scale.width = nWidth;
                scale.height = nHeight;
                scale.range = newRange;
                setTimeout(function () {
                    if (scale.range == newRange) {
                        that.createImg();
                    }
                }, 300);
            },
            // 수요 사진 생성
            createImg(e) {
                let that = this,
                        {
                                mime,
                                sourceImg,
                                scale: {
                                        x,
                                        y,
                                        width,
                                        height
                                },
                                sourceImgMasking: {
                                        scale
                                }
                        } = that,
                        canvas = that.$refs.canvas,
                        ctx = canvas.getContext('2d');
                if (e) {
                    // 이동 상태를 누르기 위해 마우스를 취소하십시오.
                    that.sourceImgMouseDown.on = false;
                }
                ctx.drawImage(sourceImg, x / scale, y / scale, width / scale, height / scale);
                that.createImgUrl = canvas.toDataURL(mime);
            },
            // 사진 업로드
            upload() {
            let that = this,
                {
                    lang,
                    imgFormat,
                    mime,
                    url,
                    params,
                    headers,
                    field,
                    ki,
                    createImgUrl
                } = this,
                fmData = new FormData();
            fmData.append(field, data2blob(createImgUrl, mime), field + '.' + imgFormat);
            // 다른 매개 변수 추가
            if (typeof params == 'object' && params) {
                Object.keys(params).forEach((k) => {
                    fmData.append(k, params[k]);
                })
            }
            // 콜백 진행 상황 모니터링
            function uploadProgress (event) {
                console.log(event)
                if (event.lengthComputable) {
                    that.progress = 100 * Math.round(event.loaded) / event.total;
                }
            };
            //파일 업로드
            that.reset();
            that.loading = 1;
            that.setStep(3);
            that.$emit('crop-success', createImgUrl, field, ki);
            fetch({
                url,
                method: 'post',
                data: fmData
            }).then(resData=>{
                that.loading = 2;
                that.$emit('crop-upload-success', resData.data);
            }).catch(err=>{
                if (that.value) {
                        that.loading = 3;
                        that.hasError = true;
                        that.errorMsg = lang.fail;
                        that.$emit('crop-upload-fail', err, field, ki);
                    }
            });
            }
        }
    }
</script>

<style scoped>
    @import "./upload.css";
</style>
