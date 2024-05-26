let timeIntervalMission = null
let joinDrawBtnSelector = 'button.DrawCard_joinBtn__FB6CR'
let joinDrawModalSelector = 'div.db-centerModal-body'
let followBtnSelector = 'button.FollowButton_followBtn__I1dri'
let submitLuckyDrawBtnSelector = 'button.JoinDrawModal_submitBtn__lP87P'
let closeModalBtnSelector = 'img.CommonModal_closeModalButton__xaheM'
let successCounter = 0

function scrollToNextPage() {
  window.scrollBy({
    top: 3000,
    behavior: 'smooth',
  })
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

// 點下抽獎卡片中的參加按鈕, follow user, 並且點擊參加按鈕
async function joinLuckyDraw(luckyDrawBtn) {
  luckyDrawBtn.click()
  
  let joinDrawModal = document.querySelector(joinDrawModalSelector)
  if (!joinDrawModal) {
    console.error('找不到參加抽獎的視窗')
    return
  }
  
  let followBtn = joinDrawModal.querySelector(followBtnSelector)
  if (followBtn) {
    followBtn.click()
    await sleep(3000)
  }
  
  let submitBtn = joinDrawModal.querySelector(submitLuckyDrawBtnSelector)
  if (submitBtn) {
    submitBtn.click()
    successCounter++
    await sleep(3000)
  } else {
    console.error('找不到參加按鈕')
  }

  let closeModalBtn = joinDrawModal.querySelector(closeModalBtnSelector)
  if (closeModalBtn) {
    closeModalBtn.click()
    await sleep(2000)
  } else {
    console.error('無法關閉抽獎視窗')
  }
}

async function startDrawing() {
  console.log('開始尋找抽獎目標')
  let luckyDrawBtn = document.querySelector(joinDrawBtnSelector)
  if (luckyDrawBtn) {
    await joinLuckyDraw(luckyDrawBtn)
    console.log('完成抽獎, 成功次數:', successCounter)
  } else {
    console.log('無法找到抽獎按鈕, 前往下一頁')
    scrollToNextPage()
  }
}

function stopDrawing() {
  clearInterval(timeIntervalMission)
  console.log('停止抽獎')
}

function main() {
  timeIntervalMission = setInterval(startDrawing, 10000)
}

main()
