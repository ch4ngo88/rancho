;(function () {
  const ua = navigator.userAgent || ''
  const isBot =
    navigator.webdriver ||
    !ua ||
    /bot|crawl|spider|slurp|fetch|preview|python|scrapy|wget|curl/i.test(ua)

  if (isBot) {
    console.warn('Bot erkannt – Zugriff eingeschränkt.')
    // Optional: blockieren, verstecken, tracken
    document.body.innerHTML = ''
    document.title = 'Access Denied'
  }
})()
