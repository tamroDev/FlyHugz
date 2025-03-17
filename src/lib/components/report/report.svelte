<script lang="ts">
  interface IReport {
    imgReport: string;
    contentReport: string;
    nameAuthor: string;
    avatarAuthor: string;
  }

  const userReport: IReport[] = [
    {
      imgReport: "https://bleame.vercel.app/assets/images/report-1.webp",
      contentReport:
        "I'm totally blown away. Ingrown hair and the skin irritation was the bane of my life for many years. Bleame has changed the way my skin looks forever!",
      nameAuthor: "Sarah F.",
      avatarAuthor: "https://bleame.vercel.app/assets/images/author_1.webp",
    },
    {
      imgReport: "https://bleame.vercel.app/assets/images/report-2.webp",
      contentReport:
        "I have struggled with strawberry leg for years and waxing just wasn't cutting it, Bleame has really made a huge difference in my life and has given me so much confidence!",
      nameAuthor: "Mariah B.",
      avatarAuthor: "https://bleame.vercel.app/assets/images/author_2.webp",
    },
    {
      imgReport: "https://bleame.vercel.app/assets/images/report-3.webp",
      contentReport:
        "It works great. I've used on my husband's body hair and surprisingly it cleans them up lol. Thank you for inventing this. Super exciting.",
      nameAuthor: "Susan T.",
      avatarAuthor: "https://bleame.vercel.app/assets/images/author_3.webp",
    },
  ];
</script>

<div class="wrapper-report">
  <div class="bg-report">
    <div class="container-page container-report">
      <div class="list_rate_report">
        <div class="list-star">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <span>4.8/5</span>
      </div>
      <div class="title_report">
        <div class="text-container">
          <h3>What Babes Like You Are Saying</h3>
        </div>
      </div>
      <div class="list_user_report">
        {#each userReport as report}
          <div class="user_report_item">
            <div class="img_product_report">
              <img loading="lazy" src={report.imgReport} alt="User report" />
            </div>
            <div class="text_report">
              <p>{report.contentReport}</p>
            </div>
            <div class="author_report">
              <img loading="lazy" src={report.avatarAuthor} alt={report.nameAuthor} />
              <h1>{report.nameAuthor}</h1>
              <div class="verified-user">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.80167 11.5784L12.1317 6.24844L11.5417 5.65844L6.80167 10.3984L4.42667 8.02344L3.83667 8.61344L6.80167 11.5784ZM8.0025 15.8218C6.96583 15.8218 5.99083 15.6251 5.0775 15.2318C4.16472 14.8379 3.37056 14.3034 2.695 13.6284C2.01944 12.954 1.48472 12.1607 1.09083 11.2484C0.696945 10.3362 0.5 9.3615 0.5 8.32428C0.5 7.28761 0.696667 6.31261 1.09 5.39928C1.48389 4.4865 2.01833 3.69233 2.69333 3.01678C3.36778 2.34122 4.16111 1.8065 5.07333 1.41261C5.98556 1.01872 6.96028 0.821777 7.9975 0.821777C9.03417 0.821777 10.0092 1.01844 10.9225 1.41178C11.8353 1.80567 12.6294 2.34011 13.305 3.01511C13.9806 3.68955 14.5153 4.48289 14.9092 5.39511C15.3031 6.30733 15.5 7.28205 15.5 8.31928C15.5 9.35594 15.3033 10.3309 14.91 11.2443C14.5161 12.1571 13.9817 12.9512 13.3067 13.6268C12.6322 14.3023 11.8389 14.8371 10.9267 15.2309C10.0144 15.6248 9.03972 15.8218 8.0025 15.8218Z"
                    fill="#7069BC"
                  ></path>
                </svg>
                <span>Verified Buyer</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
      <div class="btn result-btn">
        <a href="/pages/reviews">Read all reviews</a>
      </div>
    </div>
  </div>
</div>

<style>
  .wrapper-report {
    margin-block-start: 48px;
    margin-block-end: 48px;
  }

  .wrapper-report .bg-report {
    background: #fff;
  }

  .list_rate_report {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 0;
    justify-content: center;
    font-weight: 700;
    margin-bottom: 7px;
  }

  .list_rate_report .list-star {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .list_rate_report span {
    line-height: 21px;
  }

  .title_report {
    margin-bottom: 20px;
    text-align: center;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }

  .title_report h3 {
    font-size: 36px;
    color: var(--primary-color);
    font-weight: bold;
  }

  .list_user_report {
    display: flex;
  }

  .user_report_item {
    padding: 0 20px;
    width: 33.33%;
  }

  .text_report {
    margin-top: 15px;
    margin-bottom: 16px;
    text-align: center;
    line-height: var(--primary-lineHeight);
    color: var(--primary-color);
  }

  .author_report {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .author_report img {
    height: 40px;
    width: 40px;
    object-fit: contain;
    border-radius: 100%;
  }

  .author_report h1 {
    margin-top: 5px;
    color: var(--primary-color);
    line-height: var(--second-lineHeight);
  }

  .verified-user {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #625f6b;
    line-height: var(--primary-lineHeight);
  }

  .result-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
  }

  .result-btn a {
    font-size: 18px;
    font-weight: 600;
    padding: 10px 20px;
    border: 1px solid #625f6b;
    min-width: 350px;
    text-align: center;
    border-radius: 8px;
  }

  .img_product_report img {
    width: 100%;
    border-radius: 8px;
  }

  :global(.list-star i) {
    color: #7069bc;
  }

  .container-page {
    padding-inline: 3rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 900px) {
    .list_user_report {
      flex-wrap: wrap;
    }
    
    .title_report h3 {
      font-size: 28px;
    }
    
    .user_report_item {
      padding: 0 5px;
    }
    
    .text_report {
      font-size: 14px;
      line-height: 1.4;
    }

    .result-btn a {
      font-size: 16px;
      padding: 7px 17px;
      min-width: 250px;
    }
  }

  @media (max-width: 650px) {
    .user_report_item {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 30px;
    }

    .img_product_report img {
      margin-left: auto;
      margin-right: auto;
      width: 100%;
    }

    .text_report {
      font-size: 16px;
      line-height: 1.6;
    }
  }
</style>