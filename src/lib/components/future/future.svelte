<div class="wrapper-future">
  <section class="section_future">
    <div class="container-page future_container">
      <div class="future_video">
        <div class="video_box">
          <div class="score_video">
            <div class="swiper mySwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div>
                    <div class="video_container">
                      <div class="video_inner">
                        <video
                          class="future_video_dom"
                          src="/assets/images/future_4.mp4"
                          loop
                          poster="//bleame.com/cdn/shop/files/poster-image-v1675924900212.webp?v=1713949505"
                        ></video>
                        <div class="play-button-wrapper">
                          <div title="Play video" class="play-gif">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 80 80"
                            >
                              <path
                                d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div>
                    <div class="video_container">
                      <div class="video_inner">
                        <video
                          class="future_video_dom"
                          src="/assets/images/future_1.mp4"
                          loop
                          poster="//bleame.com/cdn/shop/files/video-capture-8863-v1675928882989.webp?v=1713949483"
                        ></video>
                        <div class="play-button-wrapper">
                          <div title="Play video" class="play-gif">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 80 80"
                            >
                              <path
                                d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div>
                    <div class="video_container">
                      <div class="video_inner">
                        <video
                          class="future_video_dom"
                          src="/assets/images/future_2.mp4"
                          poster="//bleame.com/cdn/shop/files/video-capture-6111-v1675928908603.webp?v=1713949396"
                          loop
                        ></video>
                        <div class="play-button-wrapper">
                          <div title="Play video" class="play-gif">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 80 80"
                            >
                              <path
                                d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div>
                    <div class="video_container">
                      <div class="video_inner">
                        <video
                          class="future_video_dom"
                          src="/assets/images/future_3.mp4"
                          loop
                          poster="//bleame.com/cdn/shop/files/video-capture-1024-v1675928914418.webp?v=1713949440"
                        ></video>
                        <div class="play-button-wrapper">
                          <div title="Play video" class="play-gif">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 80 80"
                            >
                              <path
                                d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <script>
                const sliderContainer = document.querySelector(".swiper");
                const sliderTrack =
                  document.querySelector(".swiper-wrapper");
                const slides = Array.from(
                  document.querySelectorAll(".swiper-slide")
                );

                let isDragging = false;
                let startX = 0;
                let scrollLeft = 0;

                sliderContainer.style.overflow = "hidden";
                sliderContainer.style.cursor = "grab";
                sliderContainer.style.display = "flex";
                sliderContainer.style.alignItems = "center";
                sliderContainer.style.userSelect = "none";

                sliderTrack.style.display = "flex";
                sliderTrack.style.gap = "10px";

                slides.forEach((slide) => {
                  const clone = slide.cloneNode(true);
                  sliderTrack.appendChild(clone);
                });

                sliderContainer.addEventListener("mousedown", (e) => {
                  isDragging = true;
                  startX = e.pageX - sliderContainer.offsetLeft;
                  scrollLeft = sliderContainer.scrollLeft;
                  sliderContainer.style.cursor = "grabbing";
                });

                sliderContainer.addEventListener("mouseleave", () => {
                  isDragging = false;
                  sliderContainer.style.cursor = "grab";
                });

                sliderContainer.addEventListener("mouseup", () => {
                  isDragging = false;
                  sliderContainer.style.cursor = "grab";
                });

                sliderContainer.addEventListener("mousemove", (e) => {
                  if (!isDragging) return;
                  e.preventDefault();
                  const x = e.pageX - sliderContainer.offsetLeft;
                  const walk = (x - startX) * 2;
                  sliderContainer.scrollLeft = scrollLeft - walk;

                  if (sliderContainer.scrollLeft <= 0) {
                    sliderContainer.scrollLeft =
                      sliderContainer.scrollWidth / 2;
                  }
                  if (
                    sliderContainer.scrollLeft >=
                    sliderContainer.scrollWidth / 2
                  ) {
                    sliderContainer.scrollLeft = 0;
                  }
                });
              </script>
            </div>
          </div>
        </div>
        <div class="text_box">
          <h3>The Future Is Hair-Free! 💜</h3>
          <div class="progress-container">
            <div class="progress-item">
              <div class="progress_icn">
                <div
                  class="circleBarWrapper"
                  style="
                    background: conic-gradient(
                      rgb(112, 105, 188) 0deg,
                      rgb(112, 105, 188) 95%,
                      rgb(227, 210, 253) 95%
                    );
                  "
                >
                  <div class="circleBarPercent"><span>95</span>%</div>
                </div>
              </div>
              <div class="text">
                Said the appearance of their strawberry legs improved
              </div>
            </div>

            <div class="progress-item">
              <div class="progress_icn">
                <div
                  class="circleBarWrapper"
                  style="
                    background: conic-gradient(
                      rgb(112, 105, 188) 0deg,
                      rgb(112, 105, 188) 95%,
                      rgb(227, 210, 253) 95%
                    );
                  "
                >
                  <div class="circleBarPercent"><span>94</span>%</div>
                </div>
              </div>
              <div class="text">
                Said the appearance of their strawberry legs improved
              </div>
            </div>
            <div class="progress-item">
              <div class="progress_icn">
                <div
                  class="circleBarWrapper"
                  style="
                    background: conic-gradient(
                      rgb(112, 105, 188) 0deg,
                      rgb(112, 105, 188) 95%,
                      rgb(227, 210, 253) 95%
                    );
                  "
                >
                  <div class="circleBarPercent"><span>90</span>%</div>
                </div>
              </div>
              <div class="text">
                Said the appearance of their strawberry legs improved
              </div>
            </div>
          </div>
          <div class="asterisk">
            <p>
              * Results according to clinical/consumer studies. For more
              information refer to each product page.
            </p>
          </div>
          <div class="btn_progress">
            <a class="btn_progress_link"><span>Claim Offer</span></a>
          </div>
          <div style="margin-top: 20px" class="rate">
            <div class="list-star">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <span>Excellent 4.8 | 1319 reviews</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .wrapper-future {
  background-color: #fafafa;
}

.section_future {
  padding-bottom: 50px;
  padding-top: 50px;
}

.future_container .future_video {
  width: 100%;
  display: flex;
}

.future_video .video_box {
  width: 50%;
  padding: 0 20px;
  position: relative;
}

.score_video {
  margin: 0 -10px;
}

.mySwiper {
  width: 100%;
  padding: 0 50px;
}

.mySwiper .swiper-wrapper {
  opacity: 1;
  width: 2673px;
  transform: translate3d(-486px, 0px, 0px);
}

.mySwiper .swiper-slide {
  float: left;
  height: 100%;
  min-height: 1px;
  width: 243px;
}

.mySwiper .swiper-slide .video_container {
  width: 100%;
  display: inline-block;
  padding: 0 10px;
}

.video_container .video_inner {
  position: relative;
  padding-top: 206%;
}

.video_inner video {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  border-radius: 10px;
}

.play-button-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  pointer-events: none;
}

.play-button-wrapper .play-gif {
  cursor: pointer;
  pointer-events: auto;
}

.video-inner-container .play-gif {
  opacity: 1;
}

.play-button-wrapper .play-gif svg {
  width: 100px;
  height: 100px;
  fill: #fff;
  stroke: #fff;
  cursor: pointer;
  background-color: #e3d2fd;
  border-radius: 50%;
  opacity: 0.9;
}

.text_box {
  width: 50%;
  padding: 0 40px 0px;
}

.text_box h3 {
  font-size: 40px;
  line-height: 45px;
  font-weight: 700;
  margin-top: 0;
  color: #2e2a39;
  margin-bottom: 10px;
}

.progress-container {
  margin-bottom: 10px;
}

.progress-item {
  display: flex;
  align-items: center;
  padding: 10px 0px;
  border-bottom: 1px solid #e8e7e7;
  color: rgba(var(--text-color), 0.75);
}

.circleBarWrapper {
  width: 70px;
  height: 70px;
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 8px;
}

.circleBarPercent {
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #fafafa;
  height: 100%;
  width: 100%;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: -0.02em;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 23px;
  color: #7069bc;
}

.progress-item .text {
  max-width: 295px;
  margin-left: 50px;
  color: #615e6a;
  font-size: 17px;
}

.asterisk {
  margin: 10px 0 20px;
}

.asterisk p {
  font-size: 14px;
  line-height: 1.2;
  margin: 10px 0 20px;
  color: #2e2a39bf;
}

.btn_progress_link {
  display: inline-block;
  vertical-align: middle;
  background: #7069bc;
  font-size: 17px !important;
  color: #fff;
  padding: 10px 35px;
  text-align: center;
  text-transform: uppercase;
  border: none;
  font-weight: 700;
  letter-spacing: 0px;
  text-decoration: none;
  border-radius: 10px;
}

.btn_progress_link span {
  line-height: 1.6;
}

.rate {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 7px;
}

.list-star i {
  color: #7069bc;
}

.rate span {
  display: flex;
  color: #2e2a39;
  line-height: 1.6;
}

.container-page {
  padding-inline: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 1300px) {
  .future_video .swiper-wrapper {
    height: 100% !important;
  }

  .mySwiper .swiper-slide {
    width: 250px !important;
  }
}

@media (max-width: 1000px) {
  .future_video .video_box {
    padding: 0;
  }
  .score_video {
    height: 100%;
  }

  .future_video .mySwiper {
    height: 100%;
  }

  .future_video .swiper-slide > div {
    height: 100%;
  }

  .future_video .swiper-slide > div .video_container,
  .future_video .swiper-slide > div .video_container .video_inner {
    height: 100%;
  }

  .text_box {
    padding: 0 20px;
  }

  .text_box h3 {
    font-size: 22px;
  }

  .circleBarWrapper {
    width: 50px;
    height: 50px;
    padding: 4px;
  }

  .circleBarPercent {
    font-size: 16px;
  }

  .progress-item .text {
    max-width: none;
    font-size: 15px;
    margin-left: 30px;
  }

  .asterisk p {
    font-size: 13px;
  }

  .btn_progress_link {
    font-size: 15px !important;
  }

  .rate span {
    font-size: 13px;
  }

  .text_box .rate {
    flex-wrap: wrap;
  }

  .text_box .list-star i {
    font-size: 12px;
  }

  .progress-item {
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
  }
}

@media (max-width: 650px) {
  .future_container .future_video {
    flex-wrap: wrap;
    overflow: hidden;
  }

  .video_box {
    margin-bottom: 20px;
  }

  .video_box,
  .text_box {
    width: 100% !important;
  }

  .progress-item {
    justify-content: start;
    flex-wrap: nowrap;
  }
}
</style>